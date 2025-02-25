'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  icon: string;
  color: string;
  description: string;
}

const navItems: NavItem[] = [
  {
    name: 'Translation',
    href: '/translation',
    icon: '🌍',
    color: 'from-blue-500 to-green-500',
    description: 'Translate between English, Bosnian, and Chinese',
  },
  {
    name: 'Learning',
    href: '/learning',
    icon: '🌎',
    color: 'from-red-500 to-orange-500',
    description: 'Interactive lessons and exercises',
  },
  {
    name: 'Practice',
    href: '/practice',
    icon: '🌏',
    color: 'from-purple-500 to-pink-500',
    description: 'Test your knowledge',
  },
  {
    name: 'Culture',
    href: '/culture',
    icon: '🌕',
    color: 'from-yellow-500 to-amber-500',
    description: 'Explore Bosnian culture',
  },
  {
    name: 'Virtual Tour',
    href: '/tours',
    icon: '🗺️',
    color: 'from-emerald-500 to-teal-500',
    description: 'Take a virtual tour of Bosnia',
  },
];

const PlanetaryNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-lg rounded-full p-2 z-50">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`relative group cursor-pointer ${
                  isActive ? 'scale-110' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Planet Button */}
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  bg-gradient-to-br ${item.color} p-0.5
                  transform transition-transform duration-300
                  ${isActive ? 'scale-110 shadow-lg shadow-white/20' : 'opacity-70'}
                `}>
                  <div className="w-full h-full rounded-full bg-black/40 backdrop-blur flex items-center justify-center relative overflow-hidden">
                    {/* Atmosphere Effect */}
                    <motion.div
                      className="absolute inset-0 opacity-50"
                      animate={{
                        background: [
                          `radial-gradient(circle at 30% 30%, transparent 0%, ${item.color.split(' ')[1]} 100%)`,
                          `radial-gradient(circle at 70% 70%, transparent 0%, ${item.color.split(' ')[1]} 100%)`,
                        ],
                      }}
                      transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                    />
                    <span className="text-2xl relative z-10">{item.icon}</span>
                  </div>
                </div>
                
                {/* Tooltip */}
                <motion.div
                  className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  animate={isActive ? { y: -5 } : { y: 0 }}
                >
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-300">{item.description}</p>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-black/80 rotate-45" />
                </motion.div>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 w-1 h-1 bg-white rounded-full"
                    layoutId="activeIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}

                {/* Orbital Ring */}
                {isActive && (
                  <motion.div
                    className="absolute -inset-2 rounded-full border-2 border-white/20"
                    initial={{ scale: 1 }}
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                )}

                {/* Cosmic Particles */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        `radial-gradient(circle at 50% 50%, ${item.color.split(' ')[1]} 0%, transparent 50%)`,
                        `radial-gradient(circle at 50% 50%, ${item.color.split(' ')[1]} 20%, transparent 70%)`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
};

export default PlanetaryNavigation; 