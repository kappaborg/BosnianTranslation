'use client';

import { HeartIcon, HomeIcon, MagnifyingGlassIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PlaylistProps {
  spotify?: {
    playlistId: string;
    title: string;
    description: string;
  }[];
  youtube?: {
    playlistId: string;
    title: string;
    description: string;
  }[];
}

export default function MusicPlaylists({ spotify, youtube }: PlaylistProps) {
  const [activeTab, setActiveTab] = useState<'spotify' | 'youtube'>('youtube');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('musicPlaylistFavorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePlayPause = (playlistId: string) => {
    if (currentPlaylist === playlistId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentPlaylist(playlistId);
      setIsPlaying(true);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const toggleFavorite = (playlistId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(playlistId)) {
      newFavorites.delete(playlistId);
    } else {
      newFavorites.add(playlistId);
    }
    setFavorites(newFavorites);
    localStorage.setItem('musicPlaylistFavorites', JSON.stringify([...newFavorites]));
  };

  const handleShare = (playlistId: string, platform: 'spotify' | 'youtube') => {
    const url = platform === 'spotify' 
      ? `https://open.spotify.com/playlist/${playlistId}`
      : `https://www.youtube.com/playlist?list=${playlistId}`;
    setShareUrl(url);
    setShowShareModal(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
      setShowShareModal(false);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const filterPlaylists = (playlists: PlaylistProps[keyof PlaylistProps] = []) => {
    return playlists?.filter(playlist => {
      const matchesSearch = playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          playlist.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFavorites = !showFavoritesOnly || favorites.has(playlist.playlistId);
      return matchesSearch && matchesFavorites;
    });
  };

  return (
    <div className="space-y-6">
      {/* Navigation and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <Link 
          href="/"
          className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
        >
          <HomeIcon className="w-6 h-6" />
          <span>Return Home</span>
        </Link>

        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search playlists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 pl-10 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`p-2 rounded-lg transition-colors ${
              showFavoritesOnly ? 'bg-red-600' : 'bg-white/10'
            } text-white`}
          >
            <HeartIcon className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Platform Selector */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('spotify')}
          className={`px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
            activeTab === 'spotify'
              ? 'bg-green-600 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span className={isMobile ? 'text-sm' : ''}>Spotify</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('youtube')}
          className={`px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
            activeTab === 'youtube'
              ? 'bg-red-600 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span className={isMobile ? 'text-sm' : ''}>YouTube</span>
        </motion.button>
      </div>

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <AnimatePresence mode="wait">
          {activeTab === 'spotify' && filterPlaylists(spotify)?.map((playlist, index) => (
            <motion.div
              key={playlist.playlistId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden"
            >
              <div className="relative">
                <iframe
                  src={`https://open.spotify.com/embed/playlist/${playlist.playlistId}`}
                  width="100%"
                  height={isMobile ? "280" : "380"}
                  frameBorder="0"
                  allow="encrypted-media"
                  className="w-full"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(playlist.playlistId)}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    {favorites.has(playlist.playlistId) ? (
                      <HeartSolidIcon className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleShare(playlist.playlistId, 'spotify')}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ShareIcon className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{playlist.title}</h3>
                <motion.p 
                  className={`text-gray-300 ${
                    expandedDescription === playlist.playlistId ? '' : 'line-clamp-2'
                  } cursor-pointer`}
                  onClick={() => setExpandedDescription(
                    expandedDescription === playlist.playlistId ? null : playlist.playlistId
                  )}
                >
                  {playlist.description}
                </motion.p>
              </div>
            </motion.div>
          ))}

          {activeTab === 'youtube' && filterPlaylists(youtube)?.map((playlist, index) => (
            <motion.div
              key={playlist.playlistId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/videoseries?list=${playlist.playlistId}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(playlist.playlistId)}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    {favorites.has(playlist.playlistId) ? (
                      <HeartSolidIcon className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleShare(playlist.playlistId, 'youtube')}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ShareIcon className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{playlist.title}</h3>
                <motion.p 
                  className={`text-gray-300 ${
                    expandedDescription === playlist.playlistId ? '' : 'line-clamp-2'
                  } cursor-pointer`}
                  onClick={() => setExpandedDescription(
                    expandedDescription === playlist.playlistId ? null : playlist.playlistId
                  )}
                >
                  {playlist.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {((activeTab === 'spotify' && (!filterPlaylists(spotify)?.length)) ||
        (activeTab === 'youtube' && (!filterPlaylists(youtube)?.length))) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="text-gray-400">
            {searchTerm || showFavoritesOnly
              ? 'No playlists match your filters'
              : 'No playlists available for this platform'}
          </p>
        </motion.div>
      )}

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full space-y-4"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Share Playlist
              </h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Copy
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 