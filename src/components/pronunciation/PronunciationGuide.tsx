'use client';

import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { PronunciationGuide as PronunciationGuideType } from '@/types';
import { MicrophoneIcon, PlayIcon, StopIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  guide: PronunciationGuideType;
  onSaveRecording?: (audioBlob: Blob) => Promise<void>;
}

export default function PronunciationGuide({ guide, onSaveRecording }: Props) {
  const { isRecording, audioURL, error, startRecording, stopRecording, clearRecording } = useAudioRecorder();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement] = useState(new Audio());

  const playOriginalAudio = async () => {
    try {
      audioElement.src = guide.audioUrl;
      audioElement.onplay = () => setIsPlaying(true);
      audioElement.onended = () => setIsPlaying(false);
      await audioElement.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white soft:text-gray-800">
            {guide.word}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 soft:text-gray-600 font-mono">
            /{guide.ipa}/
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playOriginalAudio}
            disabled={isPlaying}
            className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200
              dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:bg-indigo-900/30
              soft:bg-indigo-50 soft:text-indigo-600 soft:hover:bg-indigo-100
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlayIcon className="w-5 h-5" />
          </motion.button>

          {!isRecording && !audioURL && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startRecording}
              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200
                dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30
                soft:bg-red-50 soft:text-red-600 soft:hover:bg-red-100"
            >
              <MicrophoneIcon className="w-5 h-5" />
            </motion.button>
          )}

          {isRecording && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopRecording}
              className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700
                dark:bg-red-500 dark:hover:bg-red-600
                soft:bg-red-500 soft:hover:bg-red-600"
            >
              <StopIcon className="w-5 h-5" />
            </motion.button>
          )}

          {audioURL && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearRecording}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200
                dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700
                soft:bg-gray-50 soft:text-gray-600 soft:hover:bg-gray-100"
            >
              <TrashIcon className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 soft:text-red-600 mb-4">
          {error}
        </p>
      )}

      <div className="space-y-2">
        <h4 className="font-medium text-gray-700 dark:text-gray-300 soft:text-gray-700">
          Examples:
        </h4>
        <ul className="space-y-1">
          {guide.examples.map((example, index) => (
            <li
              key={index}
              className="text-sm text-gray-600 dark:text-gray-400 soft:text-gray-600"
            >
              {example}
            </li>
          ))}
        </ul>
      </div>

      {audioURL && (
        <div className="mt-4">
          <audio src={audioURL} controls className="w-full" />
        </div>
      )}
    </div>
  );
} 