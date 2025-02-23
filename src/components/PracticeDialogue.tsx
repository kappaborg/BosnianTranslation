'use client';

import { PracticeDialogue as DialogueType, VocabularyWord } from '@/types';
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
  const [score, setScore] = useState(0);

  const currentExchange = dialogue.exchanges[currentExchangeIndex];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setUserRecording(true);

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setUserRecording(false);
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      setFeedback('Failed to start recording. Please check your microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && userRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const provideFeedback = () => {
    // Simulate pronunciation feedback
    const feedbackOptions = [
      'Good pronunciation! Keep practicing.',
      'Try to emphasize the stress more.',
      'Pay attention to the vowel sounds.',
      'Great effort! The rhythm is improving.',
    ];
    setFeedback(feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]);
  };

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(error => console.error('Error playing audio:', error));
  };

  const handleNext = () => {
    if (currentExchangeIndex < dialogue.exchanges.length - 1) {
      setCurrentExchangeIndex(prev => prev + 1);
      setShowTranslation(false);
      setAudioBlob(null);
      setFeedback(null);
    } else {
      const finalScore = calculateScore();
      onComplete(finalScore);
    }
  };

  const calculateScore = (): number => {
    // Simple scoring based on completed exchanges
    return Math.round((score / dialogue.exchanges.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">{dialogue.title}</h2>
          <p className="text-gray-400">{dialogue.context}</p>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExchangeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {currentExchange.speaker[0]}
                  </span>
                </div>
                <div className="flex-grow space-y-2">
                  <p className="text-white text-lg">
                    {currentExchange.bosnian}
                  </p>
                  {showTranslation && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-400"
                    >
                      {currentExchange.english}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                {currentExchange.audioUrl && (
                  <button
                    onClick={() => playAudio(currentExchange.audioUrl!)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Play Audio
                  </button>
                )}
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                >
                  {showTranslation ? 'Hide' : 'Show'} Translation
                </button>
              </div>

              {/* Recording Controls */}
              <div className="space-y-4">
                {!userRecording && !audioBlob && (
                  <button
                    onClick={startRecording}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Start Recording
                  </button>
                )}
                {userRecording && (
                  <button
                    onClick={stopRecording}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Stop Recording
                  </button>
                )}
                {audioBlob && (
                  <div className="space-y-2">
                    <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
                    <button
                      onClick={provideFeedback}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Get Feedback
                    </button>
                  </div>
                )}
              </div>

              {feedback && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 rounded-lg bg-indigo-900/20 text-indigo-300"
                >
                  {feedback}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-gray-400">
            {currentExchangeIndex + 1} of {dialogue.exchanges.length}
          </span>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {currentExchangeIndex < dialogue.exchanges.length - 1 ? 'Next' : 'Complete'}
          </button>
        </div>
      </div>

      {/* Vocabulary Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Key Vocabulary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dialogue.vocabulary.map((word: VocabularyWord) => (
            <div
              key={word.id}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <p className="font-medium text-white">
                {word.bosnian}
              </p>
              <p className="text-sm text-gray-400">
                {word.english}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeDialogue; 