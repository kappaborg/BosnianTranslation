interface TranslationResponse {
  responseData: {
    translatedText: string;
  };
  responseStatus: number;
  responderId: string;
  matches: Array<any>;
}

export async function translateText(
  text: string,
  sourceLang: 'en' | 'bs',
  targetLang: 'en' | 'bs'
) {
  try {
    // MyMemory API uses 'bs-BA' for Bosnian
    const fromLang = sourceLang === 'bs' ? 'bs-BA' : 'en';
    const toLang = targetLang === 'bs' ? 'bs-BA' : 'en';
    
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=${fromLang}|${toLang}`
    );

    const data: TranslationResponse = await response.json();

    if (data.responseStatus === 200) {
      return data.responseData.translatedText;
    } else {
      throw new Error('Translation failed');
    }
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
} 