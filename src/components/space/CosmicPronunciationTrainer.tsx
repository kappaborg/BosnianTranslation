import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { CosmicWord } from '@/types';
import { setupSpeechSynthesis } from '@/utils/pronunciation';
import {
  ArrowPathIcon,
  BookmarkIcon,
  MicrophoneIcon,
  PlayIcon,
  SparklesIcon,
  StopIcon
} from '@heroicons/react/24/outline';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  words: CosmicWord[];
  onComplete: (recordings: { word: string; audioBlob: Blob }[]) => void;
}

export default function CosmicPronunciationTrainer({ words, onComplete }: Props) {
  const { isRecording, audioURL, startRecording, stopRecording, clearRecording } = useAudioRecorder();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recordings, setRecordings] = useState<{ word: string; audioBlob: Blob }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState<CosmicWord>(words[currentIndex]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [showExamples, setShowExamples] = useState(false);
  const controls = useAnimation();

  const categories = ['all', ...new Set(words.map(word => word.word))];

  const generateStarfield = () => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1
    }));
    setParticles(newParticles);
  };

  useEffect(() => {
    generateStarfield();
  }, []);

  useEffect(() => {
    if (audioURL) {
      fetch(audioURL)
        .then(response => response.blob())
        .then(blob => {
          setRecordings(prev => [...prev, { word: currentWord.word, audioBlob: blob }]);
          if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
          } else {
            onComplete(recordings);
          }
        });
    }
  }, [audioURL, currentWord.word, currentIndex, words.length, onComplete, recordings]);

  const playCorrectPronunciation = async () => {
    try {
      window.speechSynthesis.cancel();
      const utterance = setupSpeechSynthesis(currentWord.word, 'bs');
      window.speechSynthesis.speak(utterance);

      // Animate stars
      controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.5 }
      });
    } catch (error) {
      console.error('Error playing pronunciation:', error);
    }
  };

  const handleSuccess = () => {
    setScore(prev => prev + (currentWord.word.length > 5 ? 10 : 20));
    setStreak(prev => prev + 1);
    generateStarfield();
    
    // Cosmic animation
    controls.start({
      scale: [1, 1.5, 1],
      rotate: [0, 360],
      transition: { duration: 1 }
    });
  };

  const selectNewWord = () => {
    const filteredWords = selectedCategory === 'all' 
      ? words 
      : words.filter(word => word.word === selectedCategory);
    
    const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    setCurrentWord(randomWord);
    setShowExamples(false);
    clearRecording();
  };

  const getProgressColor = () => {
    if (streak >= 10) return 'text-purple-400';
    if (streak >= 5) return 'text-blue-400';
    return 'text-yellow-400';
  };

  const handlePlayOriginal = async () => {
    if (currentWord.audioUrl && !isPlaying) {
      setIsPlaying(true);
      const audio = new Audio(currentWord.audioUrl);
      audio.onended = () => setIsPlaying(false);
      try {
        await audio.play();
      } catch (error) {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative min-h-[500px] rounded-xl bg-black/50 backdrop-blur-sm p-8 overflow-hidden">
      {/* Animated starfield background */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}

      <div className="relative z-10 space-y-8">
        {/* Category selector */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Score and streak display */}
        <div className="flex justify-between items-center">
          <motion.div
            className="text-xl font-bold text-purple-400"
            animate={{ scale: score > 0 ? [1, 1.2, 1] : 1 }}
          >
            Score: {score}
          </motion.div>
          <motion.div
            className={`flex items-center space-x-2 ${getProgressColor()}`}
            animate={{ scale: streak > 0 ? [1, 1.2, 1] : 1 }}
          >
            <SparklesIcon className="w-5 h-5" />
            <span>Streak: {streak}</span>
          </motion.div>
        </div>

        {/* Current word display */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <h2 className="text-3xl font-bold text-white">{currentWord.word}</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowExamples(!showExamples)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <BookmarkIcon className="w-5 h-5" />
            </motion.button>
          </div>
          <p className="text-gray-400">{currentWord.translation}</p>
          <p className="text-sm text-indigo-400">{currentWord.word}</p>
          
          {showExamples && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 space-y-2"
            >
              <p className="text-sm text-gray-400">{currentWord.context}</p>
              <ul className="text-sm text-gray-400">
                {currentWord.examples.map((example, index) => (
                  <li key={index} className="italic">{example}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>

        {/* Control buttons */}
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={playCorrectPronunciation}
            className="p-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <PlayIcon className="w-6 h-6" />
          </motion.button>

          {!isRecording ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={startRecording}
              className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700"
            >
              <MicrophoneIcon className="w-6 h-6" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={stopRecording}
              className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 animate-pulse"
            >
              <StopIcon className="w-6 h-6" />
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={selectNewWord}
            className="p-4 rounded-full bg-green-600 text-white hover:bg-green-700"
          >
            <ArrowPathIcon className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Recording playback */}
        {audioURL && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <audio src={audioURL} controls className="w-full" />
          </motion.div>
        )}
      </div>
    </div>
  );
} 