import { translateText } from '@/utils/translation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, from, to } = body;

    if (!text || !from || !to) {
      return NextResponse.json(
        { error: 'Missing required fields: text, from, or to' },
        { status: 400 }
      );
    }

    // Validate language codes
    const validLanguages = ['en', 'bs', 'zh'];
    if (!validLanguages.includes(from) || !validLanguages.includes(to)) {
      return NextResponse.json(
        { error: 'Invalid language code. Supported languages are: en, bs, zh' },
        { status: 400 }
      );
    }

    const translatedText = await translateText(
      text,
      from as 'en' | 'bs' | 'zh',
      to as 'en' | 'bs' | 'zh'
    );

    if (!translatedText) {
      throw new Error('Translation service returned empty result');
    }

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Translation failed' },
      { status: 500 }
    );
  }
} 