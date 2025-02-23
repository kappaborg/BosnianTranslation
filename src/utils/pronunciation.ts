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
  // Basic vowels with stress patterns
  'a': 'ah',
  'e': 'eh',
  'i': 'ee',
  'o': 'oh',
  'u': 'oo',

  // Special characters with more accurate pronunciation
  'č': 'ch',
  'ć': 'ty',
  'đ': 'dy',
  'dž': 'j',
  'š': 'sh',
  'ž': 'zh',
  'lj': 'ly',
  'nj': 'ny',

  // Common syllables with stress patterns
  'ja': 'yah',
  'je': 'yeh',
  'ji': 'yee',
  'jo': 'yoh',
  'ju': 'yoo',
  'ije': 'ee-yeh',
  'ija': 'ee-yah',
  'iju': 'ee-yoo',

  // Common word endings with stress
  'ati': 'ah-tee',
  'iti': 'ee-tee',
  'eti': 'eh-tee',
  'ski': 'skee',
  'ški': 'shkee',
  'čki': 'chkee',
  'ćki': 'tykee',

  // Common prefixes with stress
  'pre': 'preh',
  'pri': 'pree',
  'pro': 'proh',
  'pod': 'pohd',
  'nad': 'nahd',
  'raz': 'rahz',
  'iz': 'eez',

  // Common words with correct stress
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
  'od': 'ohd',
  'do': 'doh',
  'po': 'poh',
  'kroz': 'krohz',
  'dobro': 'DOH-broh',
  'jutro': 'YOO-troh',
  'veče': 'VEH-cheh',
  'zdravo': 'ZDRAH-voh',
  'prijatno': 'pree-YAHT-noh',
  'vidimo': 'VEE-dee-moh',
  'se': 'seh',
  'jedan': 'YEH-dahn',
  'dva': 'dvah',
  'tri': 'tree',
  'četiri': 'CHEH-tee-ree',
  'pet': 'peht',
  'šest': 'shehst',
  'sedam': 'SEH-dahm',
  'osam': 'OH-sahm',
  'devet': 'DEH-veht',
  'deset': 'DEH-seht'
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
  // Try to find a Bosnian voice first
  const bosnianVoice = voices.find(voice => 
    voice.lang.toLowerCase().includes('bs') ||
    voice.name.toLowerCase().includes('bosnian') ||
    voice.name.toLowerCase().includes('bosanski')
  );
  
  if (bosnianVoice) return bosnianVoice;
  
  // Try to find a Croatian voice (closest to Bosnian)
  const croatianVoice = voices.find(voice => 
    voice.lang.toLowerCase().includes('hr') ||
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
    voice.lang.toLowerCase().includes('sr') ||
    voice.lang.toLowerCase().includes('mk')
  ) || null;
};

export function setupSpeechSynthesis(text: string, lang: string = 'bs'): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set initial language
  utterance.lang = lang;
  
  // Adjust speech parameters for Bosnian pronunciation
  if (lang === 'bs') {
    utterance.rate = 0.8; // Slower rate for clearer pronunciation
    utterance.pitch = 1.1; // Slightly higher pitch for Slavic sounds
    
    // Preprocess text for better pronunciation
    const processedText = preprocessBosnianText(text);
    utterance.text = processedText;
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    const bosnianVoice = getBosnianVoice(voices);
    
    if (bosnianVoice) {
      utterance.voice = bosnianVoice;
    } else {
      // If no suitable voice found, use English voice with modified parameters
      const englishVoice = voices.find(v => v.lang === 'en-US');
      if (englishVoice) {
        utterance.voice = englishVoice;
        utterance.rate = 0.7; // Even slower for English voice
        utterance.pitch = 1.2; // Higher pitch for better approximation
      }
    }
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