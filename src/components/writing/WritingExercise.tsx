'use client';

import { useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';

interface WritingPrompt {
  id: string;
  prompt: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  expectedLength: number;
  topics: string[];
  rubric: string[];
}

interface WritingSubmission {
  promptId: string;
  content: string;
  submissionDate: string;
  userId: string;
  difficulty: string;
  prompt: string;
  expectedLength: number;
  topics: string[];
  rubric: string[];
}

interface Props {
  prompt: WritingPrompt;
  userId: string;
  onSubmit?: (submission: WritingSubmission) => Promise<void>;
}

export default function WritingExercise({ prompt, userId, onSubmit }: Props) {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError('Please write something before submitting.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit?.({
        promptId: prompt.id,
        content: content.trim(),
        submissionDate: new Date().toISOString(),
        userId,
        difficulty: prompt.difficulty,
        prompt: prompt.prompt,
        expectedLength: prompt.expectedLength,
        topics: prompt.topics,
        rubric: prompt.rubric
      });
      setContent('');
    } catch (err) {
      setError('Failed to submit your writing. Please try again.');
      console.error('Error submitting writing:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Writing Exercise
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{prompt.prompt}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Topics: {prompt.topics.join(', ')}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Expected length: ~{prompt.expectedLength} words
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Difficulty: {prompt.difficulty}
          </p>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Response
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Write your response here..."
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Word count: {content.trim().split(/\s+/).filter(Boolean).length}
          </p>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>

        {prompt.rubric.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Grading Rubric
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {prompt.rubric.map((criterion, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  {criterion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 