import { motion } from 'framer-motion';

interface Props {
  message?: string;
}

export default function DinosaurAnimation({ message = 'Developer is still cooking...' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative w-64 h-64 scale-75 sm:scale-100">
        {/* Body */}
        <motion.div
          className="absolute inset-0"
          animate={{
            y: [0, -8, 0],
            rotate: [0, -1, 0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Main body - Cute green */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-48 bg-green-400 rounded-[2rem]" />
          
          {/* Belly - Lighter and rounder */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-36 bg-green-300 rounded-[2rem]"
               style={{ clipPath: 'ellipse(50% 50% at 50% 50%)' }} />
          
          {/* Head - More rounded */}
          <motion.div 
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-28 bg-green-400 rounded-[2rem]"
            animate={{
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Snout - Cuter and rounder */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-14 bg-green-400 rounded-[1.5rem]" />
            
            {/* Eyes - Bigger and more expressive */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex space-x-6">
              <motion.div
                className="relative w-8 h-8"
                animate={{
                  scale: [1, 1, 0.9, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  times: [0, 0.8, 0.85, 1],
                }}
              >
                <div className="absolute inset-0 bg-white rounded-full" />
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full" />
                </motion.div>
              </motion.div>
              <motion.div
                className="relative w-8 h-8"
                animate={{
                  scale: [1, 1, 0.9, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  times: [0, 0.8, 0.85, 1],
                }}
              >
                <div className="absolute inset-0 bg-white rounded-full" />
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full" />
                </motion.div>
              </motion.div>
            </div>

            {/* Cheeks */}
            <div className="absolute bottom-8 left-4 w-4 h-4 bg-pink-200 rounded-full opacity-60" />
            <div className="absolute bottom-8 right-4 w-4 h-4 bg-pink-200 rounded-full opacity-60" />
          </motion.div>

          {/* Spikes - Softer and rounder */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-5 h-7 bg-green-500 rounded-full"
                animate={{
                  rotate: [i % 2 ? 15 : -15, i % 2 ? 10 : -10, i % 2 ? 15 : -15],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Arms - Cuter proportions */}
          <motion.div
            className="absolute bottom-20 -left-2 w-8 h-10 bg-green-400 rounded-2xl origin-top"
            animate={{
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 -right-2 w-8 h-10 bg-green-400 rounded-2xl origin-top"
            animate={{
              rotate: [10, -10, 10],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Legs - Rounder and more playful */}
          <motion.div
            className="absolute bottom-0 left-6 w-10 h-12 bg-green-400 rounded-2xl"
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.2,
            }}
          />
          <motion.div
            className="absolute bottom-0 right-6 w-10 h-12 bg-green-400 rounded-2xl"
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.7,
            }}
          />

          {/* Tail - More dynamic movement */}
          <motion.div
            className="absolute bottom-12 -left-10 w-20 h-10 bg-green-400 rounded-full origin-right"
            animate={{
              rotate: [-15, 15, -15],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* Message with cooking animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <motion.div
          className="text-xl sm:text-2xl font-medium bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {message}
        </motion.div>
        <motion.div
          className="mt-2 text-gray-400"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          🍳 Cooking up something special...
        </motion.div>
      </motion.div>
    </div>
  );
} 