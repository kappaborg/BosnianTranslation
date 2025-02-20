'use client';

import { WritingExercise as WritingExerciseType, WritingPrompt } from '@/types';
import {
    CheckCircleIcon,
    LightBulbIcon,
    PencilIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  prompt: WritingPrompt;
  onSubmit?: (exercise: Omit<WritingExerciseType, 'id' | 'corrections'>) => Promise<void>;
}

export default function WritingExercise({ prompt, onSubmit }: Props) {
  const [content, setContent] = useState('');
  const [showTips, setShowTips] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.({
        promptId: prompt.id,
        content: content.trim(),
        submissionDate: new Date().toISOString(),
        userId: 'current-user-id', // This should come from your auth context
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting writing exercise:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Prompt Header */}
      <div className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white soft:text-gray-800">
            {prompt.title}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium
              ${
                prompt.difficulty === 'beginner'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  : prompt.difficulty === 'intermediate'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
              }`}
          >
            {prompt.difficulty.charAt(0).toUpperCase() + prompt.difficulty.slice(1)}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 soft:text-gray-600 mb-4">
          {prompt.description}
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowTips(!showTips)}
          className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 soft:text-indigo-600"
        >
          <LightBulbIcon className="w-5 h-5" />
          <span>{showTips ? 'Hide Tips' : 'Show Tips'}</span>
        </motion.button>

        {showTips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/10 soft:bg-indigo-50/50 rounded-lg"
          >
            <h3 className="font-medium text-indigo-900 dark:text-indigo-200 soft:text-indigo-900 mb-2">
              Writing Tips
            </h3>
            <ul className="space-y-2">
              {prompt.tips.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 text-indigo-700 dark:text-indigo-300 soft:text-indigo-700"
                >
                  <span className="text-sm">•</span>
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Writing Area */}
      <div className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-sm p-6 mb-6">
        <div className="mb-4">
          <label
            htmlFor="writing-area"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 soft:text-gray-700 mb-2"
          >
            Your Response
          </label>
          <div className="relative">
            <textarea
              id="writing-area"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={submitted}
              className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                dark:bg-gray-800 dark:border-gray-700 dark:focus:border-indigo-500 dark:focus:ring-indigo-500
                soft:bg-soft-50 soft:border-soft-200 soft:focus:border-indigo-500
                disabled:opacity-50 disabled:cursor-not-allowed
                resize-none"
              placeholder="Start writing your response here..."
            />
            <div className="absolute bottom-4 right-4 flex items-center space-x-4 text-sm text-gray-500">
              <span>{content.length} characters</span>
            </div>
          </div>
        </div>

        {prompt.examples.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 soft:text-gray-700 mb-2">
              Example Responses
            </h3>
            <div className="space-y-3">
              {prompt.examples.map((example, index) => (
                <p
                  key={index}
                  className="text-sm text-gray-600 dark:text-gray-400 soft:text-gray-600 italic"
                >
                  {example}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting || submitted}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium
              ${
                !content.trim() || isSubmitting || submitted
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
              }`}
          >
            {submitted ? (
              <>
                <CheckCircleIcon className="w-5 h-5" />
                <span>Submitted</span>
              </>
            ) : (
              <>
                <PencilIcon className="w-5 h-5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
} 