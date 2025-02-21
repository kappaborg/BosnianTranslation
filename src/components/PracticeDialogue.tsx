'use client';

import { PracticeDialogue as DialogueType } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface PracticeDialogueProps {
  dialogue: DialogueType;
  onComplete: (score: number) => void;
}

const PracticeDialogue: React.FC<PracticeDialogueProps> = ({
  dialogue,
  onComplete,
}) => {
  const [currentExchangeIndex, setCurrentExchangeIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [userRecording, setUserRecording] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [practiceMode, setPracticeMode] = useState<'listen' | 'speak' | 'read'>('listen');

  const currentExchange = dialogue.exchanges[currentExchangeIndex];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        // Here you would typically send this to a speech recognition service
        provideFeedback();
      };

      mediaRecorder.start();
      setUserRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setFeedback('Could not access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && userRecording) {
      mediaRecorderRef.current.stop();
      setUserRecording(false);
    }
  };

  const provideFeedback = () => {
    // This would typically involve sending the audio to a speech recognition service
    // and comparing it with the expected pronunciation
    setFeedback('Good attempt! Keep practicing to improve your pronunciation.');
  };

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  const handleNext = () => {
    if (currentExchangeIndex < dialogue.exchanges.length - 1) {
      setCurrentExchangeIndex(currentExchangeIndex + 1);
      setShowTranslation(false);
      setFeedback(null);
    } else {
      onComplete(calculateScore());
    }
  };

  const calculateScore = (): number => {
    // This would typically be based on pronunciation accuracy, timing, etc.
    return 85; // Placeholder score
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {dialogue.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{dialogue.context}</p>
      </div>

      {/* Practice Mode Selection */}
      <div className="flex space-x-2 mb-6">
        {(['listen', 'speak', 'read'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setPracticeMode(mode)}
            className={`px-4 py-2 rounded-lg ${
              practiceMode === mode
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Current Exchange */}
      <motion.div
        key={currentExchangeIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-300">
            {currentExchange.speaker}
          </span>
          {currentExchange.audioUrl && (
            <button
              onClick={() => playAudio(currentExchange.audioUrl!)}
              className="text-blue-500 hover:text-blue-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {currentExchange.bosnian}
          </p>
          <AnimatePresence>
            {showTranslation && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-gray-600 dark:text-gray-300"
              >
                {currentExchange.english}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Practice Controls */}
      <div className="space-y-4">
        {practiceMode === 'speak' && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={userRecording ? stopRecording : startRecording}
              className={`px-6 py-2 rounded-lg ${
                userRecording
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {userRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            {audioBlob && (
              <button
                onClick={() => playAudio(URL.createObjectURL(audioBlob))}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
              >
                Play Recording
              </button>
            )}
          </div>
        )}

        {feedback && (
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 p-4 rounded-lg">
            {feedback}
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
          >
            {showTranslation ? 'Hide' : 'Show'} Translation
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            {currentExchangeIndex < dialogue.exchanges.length - 1
              ? 'Next'
              : 'Complete'}
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
          <span>Progress</span>
          <span>
            {currentExchangeIndex + 1} / {dialogue.exchanges.length}
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{
              width: `${
                ((currentExchangeIndex + 1) / dialogue.exchanges.length) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Vocabulary Reference */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Key Vocabulary
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {dialogue.vocabulary.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
            >
              <p className="font-medium text-gray-900 dark:text-white">
                {item.word}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.translation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeDialogue; 