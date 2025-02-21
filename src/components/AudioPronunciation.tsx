'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface Props {
  text: string;
  lang: string;
  onRecordingComplete?: (blob: Blob) => void;
}

export default function AudioPronunciation({ text, lang, onRecordingComplete }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        if (onRecordingComplete) {
          onRecordingComplete(audioBlob);
        }
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play();
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded-lg ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors`}
      >
        {isRecording ? '⏹️ Stop Recording' : '🎙️ Record'}
      </motion.button>

      {audioURL && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={playAudio}
          className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
        >
          🔊 Play Recording
        </motion.button>
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = lang;
          window.speechSynthesis.speak(utterance);
        }}
        className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors"
      >
        🗣️ Listen to Example
      </motion.button>
    </div>
  );
} 