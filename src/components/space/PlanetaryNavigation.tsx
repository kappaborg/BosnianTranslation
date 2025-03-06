'use client';

import { GlobeAltIcon, HomeIcon, MapIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PlanetaryNavigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative">
        <div className="flex items-center justify-center space-x-4">
          {!isHome && (
            <Link href="/" className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-200" />
              <div className="relative w-12 h-12 bg-gray-900 rounded-full border-2 border-indigo-500 flex items-center justify-center text-indigo-500 hover:text-indigo-400 transition-colors">
                <HomeIcon className="w-6 h-6" />
                <span className="sr-only">Home</span>
              </div>
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Home
              </span>
            </Link>
          )}

          <Link href="/learning" className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-200" />
            <div className="relative w-12 h-12 bg-gray-900 rounded-full border-2 border-orange-500 flex items-center justify-center text-orange-500 hover:text-orange-400 transition-colors">
              <GlobeAltIcon className="w-6 h-6" />
              <span className="sr-only">Learning</span>
            </div>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Learning
            </span>
          </Link>

          <Link href="/tours" className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-200" />
            <div className="relative w-12 h-12 bg-gray-900 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-500 hover:text-emerald-400 transition-colors">
              <MapIcon className="w-6 h-6" />
              <span className="sr-only">Virtual Tour</span>
            </div>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Virtual Tour
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
} 