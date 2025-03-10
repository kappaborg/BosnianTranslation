import { enhanceBosnianTranslation } from '@/utils/bosnianAccent';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, from, to } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Missing required text field' },
        { status: 400 }
      );
    }

    const sourceLang = from || 'en';
    const targetLang = to || 'bs';

    // MyMemory API kullanarak çeviri yap
    const params = new URLSearchParams();
    params.append('q', text);
    params.append('langpair', `${sourceLang}|${targetLang}`);
    params.append('de', 'bosniatrans@example.com'); // E-posta (Rate-limit için)
    params.append('mt', '1'); // Makine çevirisi kullan

    const response = await fetch(
      `https://api.mymemory.translated.net/get?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Translation API error:', {
        status: response.status,
        statusText: response.statusText,
      });
      return NextResponse.json(
        { error: `Translation API error: ${response.status} - ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    let translatedText = data.responseData?.translatedText;

    if (!translatedText) {
      console.error('No translation found in response:', data);
      return NextResponse.json(
        { error: 'No translation found in response' },
        { status: 500 }
      );
    }

    // Boşnakça çeviriyse, metni iyileştir
    if (targetLang === 'bs') {
      translatedText = enhanceBosnianTranslation(translatedText);
    }

    return NextResponse.json({ 
      translatedText,
      match: data.responseData?.match || 0,
      responseDetails: data.responseDetails,
      responseStatus: data.responseStatus
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Translation failed' },
      { status: 500 }
    );
  }
} 