interface PhoneticPatterns {
  [key: string]: string;
}

// Bosnian phonetic patterns for special characters
const bosnianPhoneticPatterns: PhoneticPatterns = {
  'č': 'ch',  // as in "church"
  'ć': 'ch',  // softer version of č
  'đ': 'dj',  // as in "judge"
  'dž': 'j',  // as in "jam"
  'š': 'sh',  // as in "shoe"
  'ž': 'zh',  // as in "measure"
  'lj': 'ly', // as in "million"
  'nj': 'ny', // as in "canyon"
  'r': 'r',   // rolled 'r'
  'j': 'y',   // as in "yes"
};

// Common Bosnian word patterns for better pronunciation
const commonWordPatterns: PhoneticPatterns = {
  'ije': 'ee-ye', // long yat reflex
  'je': 'ye',     // short yat reflex
  'dz': 'z',      // voiced alveolar affricate
  'ia': 'iya',    // vowel sequence
  'io': 'iyo',    // vowel sequence
  'ae': 'a-e',    // vowel sequence
};

export const preprocessBosnianText = (text: string | undefined): string => {
  if (!text) return '';

  let processedText = text.toLowerCase();

  // Replace special characters and patterns
  Object.entries(bosnianPhoneticPatterns).forEach(([pattern, replacement]) => {
    processedText = processedText.replace(new RegExp(pattern, 'g'), replacement);
  });

  // Apply word patterns
  Object.entries(commonWordPatterns).forEach(([pattern, replacement]) => {
    processedText = processedText.replace(new RegExp(pattern, 'g'), replacement);
  });

  return processedText;
};

export const getBosnianVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  // Try to find a Croatian voice first (closest to Bosnian)
  const croatianVoice = voices.find(voice => voice.lang.includes('hr'));
  if (croatianVoice) return croatianVoice;

  // Try Serbian as second option
  const serbianVoice = voices.find(voice => voice.lang.includes('sr'));
  if (serbianVoice) return serbianVoice;

  // Fallback to any Slavic voice
  const slavicVoice = voices.find(voice => 
    voice.lang.includes('hr') || 
    voice.lang.includes('sr') || 
    voice.lang.includes('bs') ||
    voice.lang.includes('sl')
  );
  if (slavicVoice) return slavicVoice;

  // Last resort: use any available voice
  return voices[0] || null;
};

export function setupSpeechSynthesis(text: string, lang: string = 'bs'): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9; // Slightly slower than normal
  utterance.pitch = 1;
  utterance.volume = 1;
  return utterance;
}

export function isSpeechSynthesisSupported(): boolean {
  return 'speechSynthesis' in window;
}

export function stopSpeechSynthesis(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

// Improve pronunciation for specific Bosnian words
export const improveBosnianPronunciation = (text: string): string => {
  // Common pronunciation patterns in Bosnian
  const pronunciationRules: PhoneticPatterns = {
    'ije': 'i-je',    // Long yat reflex
    'je': 'ye',       // Short yat reflex
    'h': 'kh',        // Stronger H sound
    'l': 'll',        // Darker L sound
    'v': 'v',         // Closer to W in some positions
    'dž': 'j',        // Like English J
    'đ': 'dy',        // Soft D sound
    'ć': 'ty',        // Soft T sound
    'č': 'ch',        // Like in "church"
    'š': 'sh',        // Like in "shoe"
    'ž': 'zh',        // Like in "measure"
    'nj': 'ny',       // Like Spanish Ñ
    'lj': 'ly',       // Like Italian GL
  };

  let improvedText = text;
  Object.entries(pronunciationRules).forEach(([pattern, replacement]) => {
    improvedText = improvedText.replace(new RegExp(pattern, 'gi'), replacement);
  });

  return improvedText;
};

export const isVoiceSuitableForBosnian = (voice: SpeechSynthesisVoice): boolean => {
  const suitableLangs = ['bs', 'hr', 'sr', 'sl'];
  return suitableLangs.some(lang => voice.lang.includes(lang));
}; 