'use client';

import { extractTextFromDOCX, extractTextFromPDF, translateText } from '@/utils/translation';
import {
    ArrowPathIcon,
    ArrowsUpDownIcon,
    DocumentArrowUpIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface FileTranslatorProps {
  maxFileSize?: number; // in MB
}

// Supported file types configuration
const SUPPORTED_FILE_TYPES = {
  'text/plain': ['.txt'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.oasis.opendocument.text': ['.odt'],
  'application/rtf': ['.rtf'],
  'text/markdown': ['.md'],
  'text/csv': ['.csv'],
  'application/json': ['.json'],
  'text/html': ['.html', '.htm'],
  'application/xml': ['.xml']
};

export default function FileTranslator({ maxFileSize = 10 }: FileTranslatorProps) {
  const [file, setFile] = useState<File | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState<'en' | 'bs' | 'zh'>('en');
  const [targetLanguage, setTargetLanguage] = useState<'en' | 'bs' | 'zh'>('bs');
  const [translatedContent, setTranslatedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
  ] as const;

  const getAllowedExtensions = () => {
    return Object.values(SUPPORTED_FILE_TYPES).flat().join(',');
  };

  const isFileTypeSupported = (file: File) => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    return Object.entries(SUPPORTED_FILE_TYPES).some(([mimeType, extensions]) => {
      return file.type === mimeType || extensions.includes(fileExtension);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Check file size
    if (selectedFile.size > maxFileSize * 1024 * 1024) {
      setError(`File size must be less than ${maxFileSize}MB`);
      return;
    }

    // Check file type
    if (!isFileTypeSupported(selectedFile)) {
      setError(`Unsupported file type. Supported formats: ${getAllowedExtensions()}`);
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    try {
      // Handle different file types
      if (fileExtension === '.pdf') {
        return await extractTextFromPDF(file);
      } else if (fileExtension === '.docx' || fileExtension === '.doc') {
        return await extractTextFromDOCX(file);
      } else if (file.type.startsWith('text/') || 
                 fileExtension === '.json' || 
                 fileExtension === '.md' ||
                 fileExtension === '.xml') {
        return await readFileContent(file);
      }
      
      throw new Error('Unsupported file type for text extraction');
    } catch (error) {
      throw new Error(`Failed to extract text from file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleTranslate = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      // Extract text from file
      setProgress(10);
      const text = await extractTextFromFile(file);
      if (!text) throw new Error('Could not extract text from file');

      // Update progress
      setProgress(30);

      try {
        // Translate the extracted text
        const translatedText = await translateText(text, sourceLanguage, targetLanguage);
        setTranslatedContent(translatedText);
        setProgress(100);
      } catch (translationError) {
        throw new Error(translationError instanceof Error ? translationError.message : 'Translation failed');
      }
    } catch (error) {
      console.error('File processing error:', error);
      setError(error instanceof Error ? error.message : 'Failed to process file');
    } finally {
      setIsLoading(false);
    }
  };

  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const handleDownload = () => {
    if (!translatedContent) return;

    const blob = new Blob([translatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translated_${file?.name.split('.')[0] || 'document'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const switchLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-6">
        {/* Language Selection */}
        <div className="flex items-center justify-center space-x-4">
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value as typeof sourceLanguage)}
            className="bg-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={switchLanguages}
            className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10"
          >
            <ArrowsUpDownIcon className="w-5 h-5" />
          </motion.button>

          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value as typeof targetLanguage)}
            className="bg-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        {/* File Upload */}
        <div className="flex flex-col items-center space-y-4">
          <label className="w-full max-w-xl flex flex-col items-center px-4 py-6 bg-white/5 text-white rounded-lg cursor-pointer hover:bg-white/10">
            <DocumentArrowUpIcon className="w-12 h-12 mb-2" />
            <span className="text-base">
              {file ? file.name : `Choose a file (max ${maxFileSize}MB)`}
            </span>
            <input
              type="file"
              onChange={handleFileChange}
              accept={getAllowedExtensions()}
              className="hidden"
            />
          </label>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 text-red-400 text-sm"
            >
              <ExclamationCircleIcon className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}
        </div>

        {/* Translation Controls */}
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTranslate}
            disabled={!file || isLoading}
            className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${
              isLoading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            {isLoading && <ArrowPathIcon className="w-5 h-5 animate-spin" />}
            <span>{isLoading ? 'Translating...' : 'Translate'}</span>
          </motion.button>

          {translatedContent && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Download Translation
            </motion.button>
          )}
        </div>

        {/* Progress Bar */}
        {isLoading && (
          <div className="w-full bg-white/5 rounded-full h-2">
            <motion.div
              className="bg-indigo-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Preview */}
        {translatedContent && (
          <div className="mt-6">
            <h3 className="text-white font-medium mb-2">Translation Preview:</h3>
            <div className="bg-white/5 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                {translatedContent}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 