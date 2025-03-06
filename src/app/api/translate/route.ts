import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, targetLanguage } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const key = process.env.AZURE_TRANSLATOR_KEY;
    const region = process.env.AZURE_TRANSLATOR_REGION;
    
    if (!key || !region) {
      console.error('Azure Translator configuration missing');
      return NextResponse.json(
        { error: 'Translation service not configured' },
        { status: 503 }
      );
    }

    const endpoint = 'https://api.cognitive.microsofttranslator.com';
    const sourceLang = 'en'; // Default source language

    const response = await fetch(
      `${endpoint}/translate?api-version=3.0&from=${sourceLang}&to=${targetLanguage}`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Ocp-Apim-Subscription-Region': region,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ text }]),
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
    const translatedText = data[0]?.translations[0]?.text;

    if (!translatedText) {
      console.error('No translation found in response:', data);
      return NextResponse.json(
        { error: 'No translation found in response' },
        { status: 500 }
      );
    }

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Translation failed' },
      { status: 500 }
    );
  }
} 