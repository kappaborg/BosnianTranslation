export const checkBrowserFeatures = () => {
  const features = {
    speechRecognition: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
    speechSynthesis: 'speechSynthesis' in window,
    audioContext: 'AudioContext' in window || 'webkitAudioContext' in window,
    mediaDevices: 'mediaDevices' in navigator,
  };

  return features;
};

export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  const browsers = {
    chrome: /chrome/i.test(ua),
    safari: /safari/i.test(ua),
    firefox: /firefox/i.test(ua),
    opera: /opera/i.test(ua),
    edge: /edg/i.test(ua),
    duckduckgo: /duckduckgo/i.test(ua),
    ie: /msie|trident/i.test(ua),
  };

  return browsers;
};

export const getFeatureSupport = () => {
  const features = checkBrowserFeatures();
  const browsers = getBrowserInfo();

  // Provide fallback options based on browser and feature support
  return {
    ...features,
    fallbacks: {
      speechRecognition: !features.speechRecognition ? {
        message: "Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.",
        alternative: "You can type your text instead."
      } : null,
      speechSynthesis: !features.speechSynthesis ? {
        message: "Text-to-speech is not supported in your browser. Please use Chrome, Edge, or Safari.",
        alternative: "You can read the text manually."
      } : null,
      audioContext: !features.audioContext ? {
        message: "Audio features are limited in your browser.",
        alternative: "You can still use text-based features."
      } : null,
      mediaDevices: !features.mediaDevices ? {
        message: "Microphone access is not supported in your browser.",
        alternative: "You can type your responses instead."
      } : null,
    },
    recommendations: browsers.duckduckgo ? {
      message: "DuckDuckGo has limited support for speech features. For full functionality, please use Chrome, Edge, or Safari.",
      alternatives: ["Use text input instead of speech", "Switch to a supported browser for full features"]
    } : null
  };
}; 