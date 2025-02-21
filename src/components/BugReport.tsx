import { XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function BugReport({ isOpen, onClose }: Props) {
  const [description, setDescription] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus('idle');

    try {
      // Create form data
      const formData = new FormData();
      formData.append('description', description);
      formData.append('email', 'ozansmet@gmail.com'); // Admin email
      if (screenshot) {
        formData.append('screenshot', screenshot);
      }

      // Send email using a service like EmailJS or your backend API
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setDescription('');
      setScreenshot(null);
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-lg shadow-xl p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white soft:text-gray-800 mb-4">
              Report a Bug
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 soft:text-gray-700 mb-2"
                >
                  Bug Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Please describe the bug in detail..."
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="screenshot"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 soft:text-gray-700 mb-2"
                >
                  Screenshot (optional)
                </label>
                <input
                  type="file"
                  id="screenshot"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSending || !description.trim()}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors
                  ${
                    isSending || !description.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                  }`}
              >
                {isSending ? 'Sending...' : 'Submit Report'}
              </button>

              {status === 'success' && (
                <p className="text-green-600 dark:text-green-400 text-center">
                  Bug report submitted successfully!
                </p>
              )}

              {status === 'error' && (
                <p className="text-red-600 dark:text-red-400 text-center">
                  Failed to submit bug report. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 