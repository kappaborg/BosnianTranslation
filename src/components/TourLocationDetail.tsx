'use client';

import { TourLocation } from '@/data/tourLocations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import VirtualTour from './tours/VirtualTour';

interface TourLocationDetailProps {
  location: TourLocation;
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
              src={location.images.gallery[selectedImage]}
              alt={location.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {location.images.gallery.map((image, index) => (
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

        {/* Description and Historical Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p className="text-gray-300">{location.description}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Historical Information</h2>
            <p className="text-gray-300">{location.historicalInfo}</p>
          </div>
        </div>

        {/* Cultural Significance */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Cultural Significance</h2>
          <p className="text-gray-300">{location.culturalSignificance}</p>
        </div>

        {/* Visiting Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Visiting Hours</h2>
            <p className="text-gray-300">{location.visitingHours}</p>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-white">Admission</h3>
            <p className="text-gray-300">{location.admissionFee}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Visitor Tips</h2>
            <ul className="space-y-2">
              {location.tips.map((tip, index) => (
                <li key={index} className="text-gray-300">• {tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Virtual Tour */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">Virtual Tour</h2>
            <button
              onClick={() => setShowPanorama(!showPanorama)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {showPanorama ? 'Hide Virtual Tour' : 'Show Virtual Tour'}
            </button>
          </div>

          {showPanorama && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="aspect-video w-full"
            >
              <VirtualTour location={location} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 