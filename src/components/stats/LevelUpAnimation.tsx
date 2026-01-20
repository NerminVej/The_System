'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface LevelUpAnimationProps {
  show: boolean;
  newLevel: number;
  onComplete: () => void;
}

export function LevelUpAnimation({ show, newLevel, onComplete }: LevelUpAnimationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-sl-black/95"
        >
          <div className="text-center space-y-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 1 }}
            >
              <h1 className="text-8xl font-bold gradient-text">LEVEL UP!</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-6xl font-bold text-sl-purple">{newLevel}</p>
              <p className="text-xl text-muted-foreground mt-2">
                You have reached a new level!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex justify-center gap-4"
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -200, opacity: 0 }}
                  transition={{
                    delay: 1 + i * 0.1,
                    duration: 1.5,
                    ease: 'easeOut',
                  }}
                  className="w-2 h-2 bg-sl-purple rounded-full"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
