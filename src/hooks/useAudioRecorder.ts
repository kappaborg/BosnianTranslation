'use client';

import { useCallback, useState } from 'react';

interface AudioRecorderState {
  isRecording: boolean;
  audioURL: string | null;
  error: string | null;
}

export const useAudioRecorder = () => {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    audioURL: null,
    error: null,
  });
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((chunks) => [...chunks, event.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setState((prev) => ({ ...prev, audioURL: audioUrl }));
      };

      recorder.start();
      setMediaRecorder(recorder);
      setState((prev) => ({ ...prev, isRecording: true, error: null }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Error accessing microphone. Please check permissions.',
      }));
    }
  }, [audioChunks]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setState((prev) => ({ ...prev, isRecording: false }));
    }
  }, [mediaRecorder]);

  const clearRecording = useCallback(() => {
    if (state.audioURL) {
      URL.revokeObjectURL(state.audioURL);
    }
    setAudioChunks([]);
    setState({
      isRecording: false,
      audioURL: null,
      error: null,
    });
  }, [state.audioURL]);

  return {
    isRecording: state.isRecording,
    audioURL: state.audioURL,
    error: state.error,
    startRecording,
    stopRecording,
    clearRecording,
  };
}; 