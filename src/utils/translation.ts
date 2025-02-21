interface TranslationResponse {
  responseData: {
    translatedText: string;
    match: number;
  };
  responseStatus: number;
  responderId: string;
  matches: Array<any>;
}

export async function translateText(
  text: string,
  sourceLang: 'en' | 'bs' | 'zh',
  targetLang: 'en' | 'bs' | 'zh'
) {
  try {
    // Language code mapping for MyMemory API
    const langMap = {
      'en': 'eng',
      'bs': 'bos',
      'zh': 'cmn' // Using 'cmn' for Mandarin Chinese
    };
    
    const fromLang = langMap[sourceLang];
    const toLang = langMap[targetLang];

    // For Chinese translations, we'll use multiple translation services
    const urls = [
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}&de=ozansmet@gmail.com`,
      // Add backup translation services here if needed
    ];

    // Try multiple translation services
    for (const url of urls) {
      try {
        const response = await fetch(url);
        const data: TranslationResponse = await response.json();

        if (data.responseStatus === 200 && data.responseData.match >= 0.5) {
          return data.responseData.translatedText;
        }
      } catch (error) {
        console.warn('Translation service failed, trying next service:', error);
        continue;
      }
    }

    throw new Error('All translation services failed');
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
} 