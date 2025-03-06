'use client';

import { supportedLanguages } from '@/data/languages';
import { setupSpeechSynthesis } from '@/utils/pronunciation';
import {
    ArrowDownTrayIcon,
    SpeakerWaveIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import mammoth from 'mammoth';
import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';

// Add type definitions
type PDFDocumentProxy = any;
type PDFPageProxy = any;

interface Props {
  onProgressAction: (progress: number) => void;
}

const SUPPORTED_FILE_TYPES = {
  'text/plain': '.txt',
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/msword': '.doc',
  'application/vnd.ms-excel': '.xls',
} as const;

const SUPPORTED_EXTENSIONS = ['.txt', '.pdf', '.docx', '.xlsx', '.doc', '.xls'] as const;

const MAX_CHUNK_SIZE = 5000; // Google Translate API'nin maksimum karakter sınırı

export default function FileTranslator({ onProgressAction }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [targetLanguage, setTargetLanguage] = useState('bs');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pdfjs, setPdfjs] = useState<any>(null);

  // Load PDF.js only on client side
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadPdfjs = async () => {
      try {
        const PDFJS = await import('pdfjs-dist');
        PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;
        setPdfjs(PDFJS);
      } catch (error) {
        console.error('Error loading PDF.js:', error);
        setError('Failed to load PDF processing library');
      }
    };

    loadPdfjs();
  }, []);

  const isFileSupported = (file: File) => {
    const fileType = file.type;
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    return Object.keys(SUPPORTED_FILE_TYPES).includes(fileType) || 
           SUPPORTED_EXTENSIONS.includes(fileExtension);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (isFileSupported(selectedFile)) {
        setFile(selectedFile);
        setError(null);
        setTranslatedText('');
        extractTextFromFile(selectedFile);
      } else {
        setError(`Unsupported file type. Please select one of: ${SUPPORTED_EXTENSIONS.join(', ')}`);
        setFile(null);
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (isFileSupported(droppedFile)) {
        setFile(droppedFile);
        setError(null);
        setTranslatedText('');
        extractTextFromFile(droppedFile);
      } else {
        setError(`Unsupported file type. Please drop one of: ${SUPPORTED_EXTENSIONS.join(', ')}`);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    if (!pdfjs) {
      throw new Error('PDF.js is not loaded yet');
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(new Uint8Array(arrayBuffer)).promise;
      let text = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: { str: string }) => item.str)
          .join(' ');
        text += pageText + '\n';

        setProgress(20 + (i / pdf.numPages) * 20);
      }
      
      return text.trim();
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF file');
    }
  };

  const extractTextFromWord = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      if (result.messages.length > 0) {
        console.warn('Warnings during Word file processing:', result.messages);
      }
      
      return result.value.trim();
    } catch (error) {
      console.error('Error extracting text from Word document:', error);
      throw new Error('Failed to extract text from Word document');
    }
  };

  const extractTextFromExcel = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      let text = '';

      workbook.SheetNames.forEach((sheetName, index) => {
        const worksheet = workbook.Sheets[sheetName];
        text += `Sheet: ${sheetName}\n`;
        text += XLSX.utils.sheet_to_txt(worksheet).trim() + '\n\n';
        
        // Update progress for each sheet
        setProgress(20 + ((index + 1) / workbook.SheetNames.length) * 20);
      });

      return text.trim();
    } catch (error) {
      console.error('Error extracting text from Excel file:', error);
      throw new Error('Failed to extract text from Excel file');
    }
  };

  const extractTextFromFile = async (file: File): Promise<void> => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    try {
      let text = '';
      const fileType = file.type;

      if (fileType === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        text = await extractTextFromWord(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        text = await extractTextFromExcel(file);
      } else if (fileType === 'text/plain') {
        text = await file.text();
      } else {
        throw new Error('Unsupported file type');
      }

      setExtractedText(text);
      setError(null);
    } catch (error) {
      console.error('Error extracting text:', error);
      setError('Error extracting text from file');
    }
  };

  // Metni belirli bir boyutta parçalara ayırma
  const splitTextIntoChunks = (text: string): string[] => {
    const chunks: string[] = [];
    const sentences = text.split(/(?<=[.!?])\s+/);
    let currentChunk = '';

    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > MAX_CHUNK_SIZE) {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      }
    }

    if (currentChunk) chunks.push(currentChunk.trim());
    return chunks;
  };

  const translateText = async (text: string): Promise<void> => {
    try {
      setIsTranslating(true);
      setProgress(0);

      // Split text into chunks to handle large texts
      const chunkSize = 5000;
      const chunks = [];
      for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
      }

      let translatedChunks = [];
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: chunk,
            targetLanguage
          }),
        });

        if (!response.ok) {
          throw new Error('Translation failed');
        }

        const data = await response.json();
        translatedChunks.push(data.translatedText);
        setProgress(((i + 1) / chunks.length) * 100);
      }

      setTranslatedText(translatedChunks.join(' '));
      setError(null);
    } catch (error) {
      console.error('Translation error:', error);
      setError('Error translating text');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTranslate = () => {
    if (extractedText) {
      translateText(extractedText);
    }
  };

  const downloadTranslation = () => {
    if (!translatedText || !file) return;

    const blob = new Blob([translatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translated_${file.name.split('.')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const playPronunciation = (text: string) => {
    if (!text) return;
    
    try {
      const utterance = setupSpeechSynthesis(text, targetLanguage);
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error playing pronunciation:', error);
      setError('Error playing pronunciation');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">File Translator</h2>
        <p className="text-gray-400">Translate documents from English to Bosnian</p>
        <p className="text-sm text-gray-500">
          Supported formats: {SUPPORTED_EXTENSIONS.join(', ')}
        </p>
      </div>

      <div className="bg-white/5 rounded-xl p-8 space-y-6">
        {/* File Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors"
        >
          <input
            type="file"
            accept={SUPPORTED_EXTENSIONS.join(',')}
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <div className="space-y-4">
            <p className="text-gray-400">
              Drag and drop your file here, or
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Select File
            </motion.button>
            {file && (
              <p className="text-green-400">
                Selected file: {file.name}
              </p>
            )}
            {error && (
              <p className="text-red-400">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {isTranslating && (
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Translation Actions */}
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTranslate}
            disabled={!file || isTranslating}
            className={`px-6 py-3 rounded-lg ${
              !file || isTranslating
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            {isTranslating ? 'Translating...' : 'Translate'}
          </motion.button>

          {translatedText && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadTranslation}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Download Translation
            </motion.button>
          )}
        </div>

        {/* Translation Preview */}
        {translatedText && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Translation Preview:</h3>
            <div className="bg-black/30 rounded-lg p-4">
              <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                {translatedText}
              </pre>
            </div>
          </div>
        )}

        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Target Language
          </label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>

        {/* Extracted Text */}
        {extractedText && (
          <div>
            <h3 className="text-lg font-medium text-white mb-2">
              Extracted Text
            </h3>
            <div className="bg-white/5 rounded-lg p-4 text-gray-300">
              {extractedText}
            </div>
          </div>
        )}

        {/* Translation Result */}
        {translatedText && (
          <div>
            <h3 className="text-lg font-medium text-white mb-2">
              Translation
            </h3>
            <div className="bg-white/5 rounded-lg p-4 text-gray-300">
              {translatedText}
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={() => playPronunciation(translatedText)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
              >
                <SpeakerWaveIcon className="w-5 h-5" />
                <span>Listen</span>
              </button>
              <button
                onClick={downloadTranslation}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-red-500 bg-red-500/10 px-4 py-2 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
} 