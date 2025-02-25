'use client';

import { CulturalContent, VocabularyWord } from '@/types';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface CulturalInsightsProps {
  content?: CulturalContent;
  vocabulary?: VocabularyWord[];
  onVocabularyLearn?: (word: VocabularyWord) => void;
}

const CulturalInsights: React.FC<CulturalInsightsProps> = ({
  content,
  vocabulary,
  onVocabularyLearn,
}) => {
  const [showVocabulary, setShowVocabulary] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // If vocabulary prop is provided, render only the vocabulary section
  if (vocabulary) {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4"
      >
        {vocabulary.map((word, index) => (
          <motion.div
            key={index}
            variants={item}
            className="bg-white/5 backdrop-blur-lg p-4 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-white">
                  {word.bosnian}
                </h4>
                <p className="text-gray-300">
                  {word.english}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Context: {word.context}
                </p>
              </div>
              {onVocabularyLearn && (
                <button
                  onClick={() => onVocabularyLearn(word)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Learn
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // If content prop is provided, render the full cultural insights
  if (!content) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {content.title}
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {content.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose dark:prose-invert max-w-none"
        >
          <p className="text-gray-700 dark:text-gray-300">{content.content}</p>
        </motion.div>

        {/* Media Section */}
        {content.mediaUrls && content.mediaUrls.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {content.mediaUrls.map((url, index) => (
              <motion.div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={url}
                  alt={`${content.title} - Image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Related Vocabulary */}
        {content.relatedVocabulary && content.relatedVocabulary.length > 0 && (
          <div className="mt-6">
            <button
              onClick={() => setShowVocabulary(!showVocabulary)}
              className="flex items-center space-x-2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
            >
              <span>{showVocabulary ? 'Hide' : 'Show'} Related Vocabulary</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  showVocabulary ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showVocabulary && (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="mt-4 grid gap-4"
              >
                {content.relatedVocabulary.map((word, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {word.bosnian}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {word.english}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Context: {word.context}
                        </p>
                      </div>
                      {onVocabularyLearn && (
                        <button
                          onClick={() => onVocabularyLearn(word)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Learn
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Type: {content.type}
          </span>
          <button
            onClick={() => window.print()}
            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
          >
            Print/Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CulturalInsights; 