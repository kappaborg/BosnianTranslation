'use client';

import { CulturalContent as CulturalContentType } from '@/types';
import {
    BookOpenIcon,
    MusicalNoteIcon,
    PhotoIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  content: CulturalContentType;
}

export default function CulturalContent({ content }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const getIcon = () => {
    switch (content.type) {
      case 'article':
        return <BookOpenIcon className="w-6 h-6" />;
      case 'story':
        return <SparklesIcon className="w-6 h-6" />;
      case 'song':
        return <MusicalNoteIcon className="w-6 h-6" />;
      case 'tradition':
        return <PhotoIcon className="w-6 h-6" />;
    }
  };

  const getTypeColor = () => {
    switch (content.type) {
      case 'article':
        return 'text-blue-600 dark:text-blue-400 soft:text-blue-600';
      case 'story':
        return 'text-purple-600 dark:text-purple-400 soft:text-purple-600';
      case 'song':
        return 'text-green-600 dark:text-green-400 soft:text-green-600';
      case 'tradition':
        return 'text-orange-600 dark:text-orange-400 soft:text-orange-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 soft:border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`${getTypeColor()}`}>{getIcon()}</div>
            <span className={`text-sm font-medium capitalize ${getTypeColor()}`}>
              {content.type}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white soft:text-gray-800">
            {content.title}
          </h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {content.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-600
                  dark:bg-gray-700 dark:text-gray-300
                  soft:bg-soft-100 soft:text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div
            className="prose dark:prose-invert soft:prose-soft max-w-none"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </div>

        {/* Media Gallery */}
        {content.mediaUrls.length > 0 && (
          <div className="p-6 bg-gray-50 dark:bg-gray-700 soft:bg-soft-100">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white soft:text-gray-800 mb-4">
              Media Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.mediaUrls.map((url, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={url}
                    alt={`${content.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={content.mediaUrls[selectedImageIndex]}
              alt={`${content.title} - Image ${selectedImageIndex + 1}`}
              fill
              className="object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImageIndex(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 