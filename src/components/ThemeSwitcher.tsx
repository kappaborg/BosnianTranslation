'use client';

import { MoonIcon, SunIcon, SwatchIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'light', icon: SunIcon, label: 'Light' },
    { id: 'dark', icon: MoonIcon, label: 'Dark' },
    { id: 'soft', icon: SwatchIcon, label: 'Soft' },
  ] as const;

  return (
    <div className="flex items-center gap-2">
      {themes.map(({ id, icon: Icon, label }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(id)}
          className={`p-2 rounded-lg flex items-center gap-2 transition-colors
            ${theme === id 
              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300'
              : 'hover:bg-gray-100 text-gray-600 dark:hover:bg-gray-800 dark:text-gray-300'
            }`}
          title={`Switch to ${label} theme`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-sm font-medium">{label}</span>
        </motion.button>
      ))}
    </div>
  );
} 