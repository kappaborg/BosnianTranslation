'use client';

import { useCallback, useState } from 'react';

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((chunks) => [...chunks, event.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      recorder.onerror = () => {
        setError('An error occurred during recording');
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      setError('Error accessing microphone: ' + (error instanceof Error ? error.message : String(error)));
      console.error('Error starting recording:', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      try {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      } catch (error) {
        setError('Error stopping recording: ' + (error instanceof Error ? error.message : String(error)));
        console.error('Error stopping recording:', error);
      }
    }
  }, [mediaRecorder]);

  const clearRecording = useCallback(() => {
    try {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
      setAudioURL(null);
      setAudioChunks([]);
      setError(null);
    } catch (error) {
      setError('Error clearing recording: ' + (error instanceof Error ? error.message : String(error)));
      console.error('Error clearing recording:', error);
    }
  }, [audioURL]);

  return {
    isRecording,
    audioURL,
    error,
    startRecording,
    stopRecording,
    clearRecording
  };
}; 