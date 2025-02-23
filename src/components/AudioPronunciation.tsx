'use client';

import { setupSpeechSynthesis } from '@/utils/pronunciation';
import { MicrophoneIcon, PlayIcon, StopIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface Props {
  text: string;
  lang: string;
  audioUrl?: string;
  onRecordingComplete?: (blob: Blob) => void;
}

// Bosnian pronunciation mappings
const bosnianPronunciationMap: { [key: string]: string } = {
  // Special characters
  'č': 'ch',
  'ć': 'ch',
  'đ': 'dj',
  'š': 'sh',
  'ž': 'zh',
  'dž': 'j',
  'lj': 'ly',
  'nj': 'ny',
  
  // Specific syllables and sounds
  'je': 'ye',
  'ja': 'ya',
  'ju': 'yu',
  'jo': 'yo',
  'ije': 'iye',
  'nja': 'nya',
  'nje': 'nye',
  'ji': 'yi',
  
  // Common word patterns
  'gdje': 'gdye',
  'tje': 'tye',
  'dje': 'dye',
  'mje': 'mye',
  'sje': 'sye',
  'zje': 'zye',
  'rje': 'rye',
  
  // Additional combinations
  'ija': 'iya',
  'iju': 'iyu',
  'ijo': 'iyo',
};

export default function AudioPronunciation({ text, lang, audioUrl, onRecordingComplete }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const audioElement = useRef<HTMLAudioElement | null>(null);

  const preprocessBosnianText = (text: string): string => {
    let processedText = text.toLowerCase();
    
    // First, handle multi-character patterns
    Object.entries(bosnianPronunciationMap)
      .sort((a, b) => b[0].length - a[0].length) // Sort by length to handle longer patterns first
      .forEach(([bosnian, phonetic]) => {
        const regex = new RegExp(bosnian, 'gi');
        processedText = processedText.replace(regex, phonetic);
      });

    // Additional pronunciation rules
    processedText = processedText
      // Handle word-initial 'j' sounds
      .replace(/\bj([aeiou])/g, 'y$1')
      // Handle intervocalic 'j'
      .replace(/([aeiou])j([aeiou])/g, '$1y$2')
      // Ensure proper stress on long vowels
      .replace(/ije/g, 'iye');

    return processedText;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
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
      setError(null);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Error accessing microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const clearRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
      setAudioURL(null);
    }
  };

  const playAudio = async () => {
    try {
      if (isPlaying) {
        if (audioElement.current) {
          audioElement.current.pause();
          audioElement.current.currentTime = 0;
        }
        setIsPlaying(false);
        return;
      }

      // If we have a pre-recorded audio URL, use that
      if (audioUrl) {
        if (!audioElement.current) {
          audioElement.current = new Audio(audioUrl);
        } else {
          audioElement.current.src = audioUrl;
        }
      }
      // Otherwise, if we have a user recording, use that
      else if (audioURL) {
        if (!audioElement.current) {
          audioElement.current = new Audio(audioURL);
        } else {
          audioElement.current.src = audioURL;
        }
      }
      // If no audio is available, use text-to-speech
      else {
        const utterance = setupSpeechSynthesis(text, lang);
        window.speechSynthesis.speak(utterance);
        return;
      }

      audioElement.current.onplay = () => setIsPlaying(true);
      audioElement.current.onended = () => setIsPlaying(false);
      audioElement.current.onerror = (e) => {
        console.error('Error playing audio:', e);
        setError('Failed to play audio. Please try again.');
        setIsPlaying(false);
      };

      await audioElement.current.play();
      setError(null);
    } catch (error) {
      console.error('Error playing audio:', error);
      setError('Failed to play audio. Please try again.');
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {error && (
        <div className="text-red-500 text-sm mb-2">
          {error}
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={playAudio}
          className={`p-2 rounded-full ${
            isPlaying
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          } transition-colors`}
          title={isPlaying ? 'Stop' : 'Play pronunciation'}
        >
          <PlayIcon className="w-5 h-5" />
        </motion.button>

        {!isRecording && !audioURL && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={startRecording}
            className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
            title="Record your pronunciation"
          >
            <MicrophoneIcon className="w-5 h-5" />
          </motion.button>
        )}

        {isRecording && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={stopRecording}
            className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors animate-pulse"
            title="Stop recording"
          >
            <StopIcon className="w-5 h-5" />
          </motion.button>
        )}

        {audioURL && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearRecording}
            className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
            title="Clear recording"
          >
            <TrashIcon className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {audioURL && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="w-full mt-2"
        >
          <audio
            src={audioURL}
            controls
            className="w-full max-w-[200px]"
          />
        </motion.div>
      )}
    </div>
  );
} 