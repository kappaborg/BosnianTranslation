'use client';

import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';

interface AudioPronunciationProps {
  text: string;
  lang?: string;
}

export default function AudioPronunciation({ text, lang = 'bs' }: AudioPronunciationProps) {
  const speak = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Use Croatian voice as it's closest to Bosnian pronunciation
    utterance.lang = 'hr-HR';
    utterance.rate = 0.8; // Slower rate for better clarity
    utterance.pitch = 1.1; // Slightly higher pitch for clearer pronunciation
    
    // Try to find a Croatian voice
    const voices = window.speechSynthesis.getVoices();
    const croatianVoice = voices.find(voice => voice.lang.includes('hr'));
    if (croatianVoice) {
      utterance.voice = croatianVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [text]);

  return (
    <button
      onClick={speak}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title="Listen to pronunciation"
    >
      <SpeakerWaveIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
    </button>
  );
} 