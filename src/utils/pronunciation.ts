interface PhoneticPatterns {
  [key: string]: string;
}

export const bosnianLetterMap: Record<string, string> = {
  'č': 'ch',
  'ć': 'ty',
  'đ': 'dj',
  'dž': 'j',
  'š': 'sh',
  'ž': 'zh',
  'lj': 'ly',
  'nj': 'ny',
  'j': 'y',
  'r': 'r',
  'h': 'h',
  'c': 'ts'
};

// Bosnian phonetic patterns for more accurate pronunciation
const phoneticPatterns: PhoneticPatterns = {
  // Basic vowels
  'a': 'ah',
  'e': 'eh',
  'i': 'ee',
  'o': 'oh',
  'u': 'oo',

  // Special characters
  'č': 'ch',
  'ć': 'ch',
  'đ': 'dj',
  'dž': 'j',
  'š': 'sh',
  'ž': 'zh',
  'lj': 'ly',
  'nj': 'ny',

  // Common syllables
  'ja': 'yah',
  'je': 'yeh',
  'ji': 'yee',
  'jo': 'yoh',
  'ju': 'yoo',

  // Common word endings
  'ati': 'ah-tee',
  'iti': 'ee-tee',
  'ski': 'skee',
  'ški': 'shkee',
  'čki': 'chkee',
  'ćki': 'chkee',

  // Common prefixes
  'pre': 'preh',
  'pri': 'pree',
  'pro': 'proh',
  'pod': 'pohd',
  'nad': 'nahd',

  // Common words
  'hvala': 'HVAH-lah',
  'molim': 'MOH-leem',
  'dobar': 'DOH-bahr',
  'dan': 'dahn',
  'kako': 'KAH-koh',
  'gdje': 'g-DYEH',
  'šta': 'shtah',
  'ko': 'koh',
  'da': 'dah',
  'ne': 'neh',
  'na': 'nah',
  'za': 'zah',
  'sa': 'sah',
  'iz': 'eez',
  'od': 'ohd',
  'do': 'doh',
  'po': 'poh',
  'kroz': 'krohz'
};

export const preprocessBosnianText = (text: string | undefined): string => {
  if (!text) return '';
  
  let processedText = text.toLowerCase().trim();
  
  // Handle empty or invalid input
  if (!processedText) return '';
  
  // First handle multi-word patterns
  const words = processedText.split(/\s+/);
  processedText = words.map(word => {
    // Remove any non-letter characters except hyphens and apostrophes
    const cleanWord = word.replace(/[^a-zčćđšž\-']/gi, '');
    
    // Check if the word has a specific pronunciation pattern
    if (cleanWord in phoneticPatterns) {
      return phoneticPatterns[cleanWord];
    }
    
    // Process individual syllables
    let processed = cleanWord;
    
    // Sort patterns by length (longest first) to handle overlapping patterns
    const sortedPatterns = Object.entries(phoneticPatterns)
      .sort(([a], [b]) => b.length - a.length);
    
    for (const [pattern, phonetic] of sortedPatterns) {
      if (pattern.length > 1) { // Only process multi-character patterns
        const regex = new RegExp(pattern, 'gi');
        processed = processed.replace(regex, phonetic);
      }
    }
    
    // Process remaining single characters
    for (const char of processed) {
      if (char in phoneticPatterns) {
        processed = processed.replace(char, phoneticPatterns[char]);
      }
    }
    
    return processed;
  }).join(' ');
  
  // Capitalize first letter of sentences
  processedText = processedText.replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
  
  return processedText;
};

export const getBosnianVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  // Try to find a Croatian voice first (closest to Bosnian)
  const croatianVoice = voices.find(voice => 
    voice.lang.toLowerCase().includes('hr') ||
    voice.lang.toLowerCase().includes('bs') ||
    voice.name.toLowerCase().includes('croatian') ||
    voice.name.toLowerCase().includes('hrvatski')
  );
  
  if (croatianVoice) return croatianVoice;
  
  // Fallback to Serbian voice
  const serbianVoice = voices.find(voice =>
    voice.lang.toLowerCase().includes('sr') ||
    voice.name.toLowerCase().includes('serbian') ||
    voice.name.toLowerCase().includes('srpski')
  );
  
  if (serbianVoice) return serbianVoice;
  
  // Last resort: try to find any Slavic voice
  return voices.find(voice =>
    voice.lang.toLowerCase().includes('sl') ||
    voice.lang.toLowerCase().includes('hr') ||
    voice.lang.toLowerCase().includes('bs') ||
    voice.lang.toLowerCase().includes('sr')
  ) || null;
};

export function setupSpeechSynthesis(text: string, lang: string = 'bs'): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.8; // Slightly slower for better clarity
  utterance.pitch = 1;
  
  // Find a voice that matches our language if available
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang.startsWith(lang)) || voices[0];
  if (voice) {
    utterance.voice = voice;
  }

  return utterance;
}

export function isSpeechSynthesisSupported(): boolean {
  return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

export function stopSpeechSynthesis(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

export const improveBosnianPronunciation = (text: string): string => {
  // Add stress marks for proper emphasis
  let processed = text.replace(/\b(\w+)\b/g, (word) => {
    if (word.length > 1) {
      // Stress typically falls on the first syllable in Bosnian
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word;
  });

  // Add slight pauses for natural rhythm
  processed = processed.replace(/([.!?])\s+/g, '$1\n');
  processed = processed.replace(/([,;])\s+/g, '$1 ');

  return processed;
};

export const isVoiceSuitableForBosnian = (voice: SpeechSynthesisVoice): boolean => {
  const suitableLangs = ['hr', 'bs', 'sr', 'sl'];
  return suitableLangs.some(lang => 
    voice.lang.toLowerCase().includes(lang) ||
    voice.name.toLowerCase().includes(lang)
  );
}; 