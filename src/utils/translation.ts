import { Language } from '@/data/languages';

type SupportedLanguage = Language['code'];

interface TranslationResponse {
  responseData: {
    translatedText: string;
    match: number;
  };
  responseStatus: number;
  responderId: string;
  matches: Array<{
    id: string;
    segment: string;
    translation: string;
    quality: number;
    match: number;
  }>;
}

let pdfjsLib: any = null;
let mammothLib: any = null;

async function initializeLibraries() {
  if (typeof window !== 'undefined') {
    if (!pdfjsLib) {
      const pdfjs = await import('pdfjs-dist');
      const worker = await import('pdfjs-dist/build/pdf.worker.entry');
      pdfjsLib = pdfjs;
      pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
    }
    
    if (!mammothLib) {
      mammothLib = await import('mammoth');
    }
  }
}

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    await initializeLibraries();
    
    if (!pdfjsLib) {
      throw new Error('PDF.js library failed to initialize');
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function extractTextFromDOCX(file: File): Promise<string> {
  try {
    await initializeLibraries();
    if (!mammothLib) {
      throw new Error('Mammoth library not initialized');
    }

    const arrayBuffer = await file.arrayBuffer();
    const result = await mammothLib.default.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error('DOCX extraction error:', error);
    throw new Error(`Failed to extract text from DOCX: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function splitTextIntoChunks(text: string): string[] {
  const maxChunkLength = 500;
  const chunks: string[] = [];
  const sentences = text.split(/(?<=[.!?])\s+/);
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxChunkLength) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += (currentChunk ? ' ' : '') + sentence;
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

async function translateChunk(
  text: string,
  from: SupportedLanguage,
  to: SupportedLanguage,
  retries: number = 3
): Promise<string> {
  let lastError: Error | null = null;
  const baseDelay = 1000;

  for (let i = 0; i < retries; i++) {
    try {
      if (i > 0) {
        const delay = baseDelay * Math.pow(2, i - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLanguage: to,
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.translatedText) {
        throw new Error('Empty translation received');
      }

      return data.translatedText;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      console.warn(`Translation attempt ${i + 1} failed:`, lastError.message);
    }
  }

  throw lastError || new Error('Translation failed after multiple attempts');
}

export async function translateText(
  text: string,
  sourceLanguage: SupportedLanguage,
  targetLanguage: SupportedLanguage
): Promise<string> {
  if (!text?.trim()) {
    throw new Error('No text provided for translation');
  }

  const chunks = splitTextIntoChunks(text);
  const translatedChunks: string[] = [];
  let failedChunks = 0;
  const maxFailureRate = 0.3; // Reduce to 30% failure threshold

  console.log(`Translating ${chunks.length} chunks...`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i].trim();
    if (!chunk) continue;

    try {
      // Add progressive delay between chunks
      if (i > 0) {
        const delay = Math.min(300 + (i * 50), 2000); // Cap maximum delay at 2 seconds
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const translatedChunk = await translateChunk(chunk, sourceLanguage, targetLanguage);
      translatedChunks.push(translatedChunk);
      
      // Log progress
      console.log(`Translated chunk ${i + 1}/${chunks.length}`);
    } catch (error) {
      console.error(`Chunk ${i + 1} translation error:`, error);
      failedChunks++;
      
      if (failedChunks / chunks.length > maxFailureRate) {
        throw new Error(`Translation quality threshold exceeded. ${failedChunks} out of ${chunks.length} chunks failed. Please try again in a few minutes.`);
      }
      
      // Mark failed chunks more clearly
      translatedChunks.push(`[Failed to translate: "${chunk.substring(0, 30)}..."]`);
    }
  }

  // Join chunks with appropriate spacing and formatting
  return translatedChunks
    .filter(chunk => chunk.length > 0)
    .join('\n\n')
    .replace(/\[\s*Failed to translate:/g, '\n[Failed to translate:')
    .trim();
} 