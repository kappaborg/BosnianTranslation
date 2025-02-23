'use client';

import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { PronunciationGuideType } from '@/types';
import { MicrophoneIcon, PauseIcon, PlayIcon, StopIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';

interface Props {
  guide: PronunciationGuideType;
  onSaveRecording: (audioBlob: Blob) => void;
}

export default function PronunciationGuide({ guide, onSaveRecording }: Props) {
  const { isRecording, audioURL, error, startRecording, stopRecording, clearRecording } = useAudioRecorder();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement] = useState(new Audio());

  useEffect(() => {
    if (audioURL) {
      audioElement.src = audioURL;
    }
    return () => {
      audioElement.pause();
      if (audioElement.src) {
        URL.revokeObjectURL(audioElement.src);
      }
    };
  }, [audioURL, audioElement]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  audioElement.onended = () => {
    setIsPlaying(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{guide.word}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{guide.description}</p>
          {guide.examples && guide.examples.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Examples:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                {guide.examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-2 mt-4">
        {guide.audioUrl && (
          <Button
            onClick={() => {
              audioElement.src = guide.audioUrl || '';
              audioElement.play().catch(console.error);
            }}
            variant="outline"
            className="flex items-center gap-2"
          >
            <PlayIcon className="h-5 w-5" />
            Play Original
          </Button>
        )}

        {!isRecording && !audioURL && (
          <Button
            onClick={startRecording}
            variant="outline"
            className="flex items-center gap-2"
          >
            <MicrophoneIcon className="h-5 w-5" />
            Start Recording
          </Button>
        )}

        {isRecording && (
          <Button
            onClick={stopRecording}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <StopIcon className="h-5 w-5" />
            Stop Recording
          </Button>
        )}

        {audioURL && (
          <>
            <Button
              onClick={handlePlayPause}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <PauseIcon className="h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <PlayIcon className="h-5 w-5" />
                  Play
                </>
              )}
            </Button>

            <Button
              onClick={clearRecording}
              variant="ghost"
              className="flex items-center gap-2"
            >
              <XCircleIcon className="h-5 w-5" />
              Clear
            </Button>

            <Button
              onClick={() => {
                if (audioURL) {
                  fetch(audioURL)
                    .then(response => response.blob())
                    .then(blob => onSaveRecording(blob))
                    .catch(error => console.error('Error saving recording:', error));
                }
              }}
              variant="default"
              className="ml-auto"
            >
              Save Recording
            </Button>
          </>
        )}
      </div>
    </div>
  );
} 