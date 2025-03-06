'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface Props {
  category: string;
  onProgressAction: (progress: number) => void;
}

export default function SpeakingPractice({ category, onProgressAction }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => chunks.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/ogg; codecs=opus' });
        setAudioBlob(blob);
        chunks.current = [];
      };

      mediaRecorder.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setFeedback('Error accessing microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      onProgressAction(1); // Increment progress
    }
  };

  const provideFeedback = () => {
    // Simulated feedback - in a real app, this would use speech recognition
    const feedbackOptions = [
      'Good pronunciation! Keep practicing.',
      'Try to emphasize the stress more.',
      'Pay attention to the vowel sounds.',
      'Great effort! Your rhythm is improving.',
    ];
    setFeedback(feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Speaking Practice</h2>
        <p className="text-gray-400">Practice your Bosnian pronunciation</p>
      </div>

      <div className="bg-white/5 rounded-xl p-8 space-y-6">
        <div className="text-center space-y-4">
          <p className="text-xl text-white">Try saying:</p>
          <p className="text-2xl font-bold text-white">"Dobar dan"</p>
          <p className="text-gray-400">Good day</p>
        </div>

        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${
              isRecording
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
          </motion.button>
        </div>

        {audioBlob && (
          <div className="space-y-4">
            <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={provideFeedback}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Get Feedback
              </motion.button>
            </div>
          </div>
        )}

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 rounded-lg p-4 text-center text-white"
          >
            {feedback}
          </motion.div>
        )}
      </div>
    </div>
  );
} 