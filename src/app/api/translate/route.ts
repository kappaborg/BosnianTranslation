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

    // Check if API key is available
    const apiKey = process.env.AZURE_TRANSLATOR_KEY;
    const region = process.env.AZURE_TRANSLATOR_REGION;

    if (!apiKey || !region) {
      console.error('Translation API credentials are missing');
      return NextResponse.json(
        { error: 'Translation service is not configured' },
        { status: 503 }
      );
    }

    const endpoint = 'https://api.cognitive.microsofttranslator.com';
    const response = await fetch(
      `${endpoint}/translate?api-version=3.0&to=${targetLanguage}`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Ocp-Apim-Subscription-Region': region,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ text }]),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Translation API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
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