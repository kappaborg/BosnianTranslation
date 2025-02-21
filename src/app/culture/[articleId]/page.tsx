'use client';

import CulturalInsights from '@/components/CulturalInsights';
import { CulturalContent } from '@/types';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CultureArticle() {
  const params = useParams();
  const [article, setArticle] = useState<CulturalContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated article data - replace with actual API call
    const fetchArticle = async () => {
      try {
        // Mock data for demonstration
        const mockArticle: CulturalContent = {
          id: params.articleId as string,
          title: 'Bosnian Coffee Culture',
          type: 'tradition',
          content: `
            Bosnian coffee (Bosanska kafa) is more than just a beverage - it's a centuries-old ritual 
            that reflects the rich cultural heritage of Bosnia and Herzegovina. The preparation and 
            serving of Bosnian coffee follows a specific ceremony, using special dishes and techniques 
            passed down through generations.
          `,
          mediaUrls: [
            '/images/bosnian-coffee.jpg',
            '/images/coffee-set.jpg'
          ],
          tags: ['tradition', 'coffee', 'culture', 'hospitality'],
          relatedVocabulary: [
            {
              bosnian: 'kahva',
              english: 'coffee',
              context: 'Traditional Bosnian coffee',
              category: 'beverages',
              difficulty: 'beginner',
              usage: ['Želite li kahvu?', 'Kahva je spremna.']
            },
            {
              bosnian: 'džezva',
              english: 'coffee pot',
              context: 'Traditional copper coffee pot',
              category: 'utensils',
              difficulty: 'beginner',
              usage: ['Kahva se kuha u džezvi.']
            }
          ]
        };

        setArticle(mockArticle);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.articleId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The article you're looking for doesn't exist or has been removed.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <CulturalInsights
          content={article}
          onVocabularyLearn={(word) => {
            // Handle vocabulary learning
            console.log('Learning word:', word);
          }}
        />
      </motion.div>
    </div>
  );
} 