'use client';

import { Location } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import PanoramaViewer from './PanoramaViewer';

interface TourLocationDetailProps {
  location: Location;
}

export default function TourLocationDetail({ location }: TourLocationDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showPanorama, setShowPanorama] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6">{location.name}</h1>

        {/* Main image and gallery */}
        <div className="mb-8">
          <div className="relative h-[500px] rounded-lg overflow-hidden mb-4">
            <Image
              src={location.images[selectedImage]}
              alt={location.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {location.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setSelectedImage(index)}
                className={`relative h-24 rounded-lg overflow-hidden transition-all ${
                  selectedImage === index
                    ? 'ring-2 ring-blue-500 scale-95'
                    : 'hover:scale-95'
                }`}
              >
                <Image
                  src={image}
                  alt={`${location.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Description and Historical Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p className="text-gray-600">{location.description}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Historical Facts</h2>
            <ul className="space-y-4">
              {location.historicalFacts.map((fact, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full mr-3 flex-shrink-0 mt-1">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{fact}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Audio Guide */}
        {location.audioGuide && (
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Audio Guide</h2>
            <audio controls className="w-full">
              <source src={location.audioGuide} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* Panorama Section */}
        {location.panorama && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">360° Panorama View</h2>
              <button
                onClick={() => setShowPanorama(!showPanorama)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {showPanorama ? 'Hide Panorama' : 'Show Panorama'}
              </button>
            </div>

            {showPanorama && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PanoramaViewer location={location} />
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
} 