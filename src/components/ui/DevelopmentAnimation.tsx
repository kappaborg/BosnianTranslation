import { motion } from 'framer-motion';

interface Props {
  message?: string;
}

export default function DevelopmentAnimation({ message = 'Under Development...' }: Props) {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-8 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-48 h-48">
        {/* Monster Body */}
        <motion.div
          className="absolute w-32 h-32 bg-indigo-500 rounded-3xl left-8 top-8"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -1, 1, -1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {/* Eyes */}
          <div className="absolute flex space-x-4 left-4 top-4">
            <motion.div
              className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <motion.div
                className="w-3 h-3 bg-black rounded-full"
                animate={{
                  y: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
            <motion.div
              className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <motion.div
                className="w-3 h-3 bg-black rounded-full"
                animate={{
                  y: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          </div>

          {/* Laptop */}
          <motion.div
            className="absolute -bottom-8 -right-8 w-24 h-16 bg-gray-700 rounded-lg"
            animate={{
              rotateX: [0, 2, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {/* Screen */}
            <motion.div
              className="absolute inset-1 bg-blue-400 rounded"
              animate={{
                backgroundColor: ['#60A5FA', '#818CF8', '#60A5FA'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {/* Code Lines */}
              <motion.div
                className="flex flex-col space-y-1 p-1"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <div className="w-1/2 h-1 bg-white/30 rounded" />
                <div className="w-3/4 h-1 bg-white/30 rounded" />
                <div className="w-1/3 h-1 bg-white/30 rounded" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Typing Effect */}
        <motion.div
          className="absolute -bottom-12 left-0 right-0 text-center text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {message}
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          animate={{
            width: ['0%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </motion.div>
  );
} 