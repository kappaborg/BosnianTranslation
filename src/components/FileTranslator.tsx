'use client';

import { Language, supportedLanguages } from '@/data/languages';
import { extractTextFromDOCX, extractTextFromPDF, translateText } from '@/utils/translation';
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

interface TranslationResult {
  original: string;
  translated: string;
}

export default function FileTranslator({ maxFileSize = 10 }: FileTranslatorProps) {
  const [file, setFile] = useState<File | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState<Language['code']>('en');
  const [targetLanguage, setTargetLanguage] = useState<Language['code']>('bs');
  const [results, setResults] = useState<TranslationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

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

  const handleTranslation = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

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
        setResults([{ original: text, translated: translatedText }]);
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
    if (results.length === 0) return;

    const blob = new Blob([JSON.stringify(results)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translated_${file?.name.split('.')[0] || 'document'}.json`;
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Language Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-4">
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value as Language['code'])}
            className="bg-gray-800 dark:bg-gray-700 text-white rounded-lg p-2 flex-1"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
          
          <button
            onClick={switchLanguages}
            className="p-2 bg-gray-800 dark:bg-gray-700 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600"
          >
            ⇄
          </button>
          
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value as Language['code'])}
            className="bg-gray-800 dark:bg-gray-700 text-white rounded-lg p-2 flex-1"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* File Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-4">
          <label className="flex-1 w-full">
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept={getAllowedExtensions()}
                id="file-input"
              />
              <div className="flex items-center justify-center w-full p-4 bg-gray-800 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                <span className="text-gray-300">
                  {file ? file.name : `Choose a file to translate from ${supportedLanguages.find(l => l.code === sourceLanguage)?.name} to ${supportedLanguages.find(l => l.code === targetLanguage)?.name}`}
                </span>
              </div>
            </div>
          </label>
          <button
            onClick={handleTranslation}
            disabled={!file || isLoading}
            className={`px-6 py-3 rounded-lg text-white font-medium transition-colors
              ${!file || isLoading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'}
              md:w-auto w-full`}
          >
            {isLoading ? 'Translating...' : 'Translate'}
          </button>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mt-2"
          >
            {error}
          </motion.p>
        )}

        {progress > 0 && progress < 100 && (
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </motion.div>

      {/* Results Section */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-gray-900 dark:bg-gray-800 rounded-lg p-6 shadow-xl"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-300">
                    {supportedLanguages.find(l => l.code === sourceLanguage)?.name}
                  </h3>
                  <p className="text-gray-400">{result.original}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-300">
                    {supportedLanguages.find(l => l.code === targetLanguage)?.name}
                  </h3>
                  <p className="text-gray-400">{result.translated}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Download Button */}
      {results.length > 0 && (
        <div className="mt-6 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Download Translation
          </motion.button>
        </div>
      )}
    </div>
  );
} 