'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface PunishmentModalProps {
  show: boolean;
  onClose: () => void;
}

export function PunishmentModal({ show, onClose }: PunishmentModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-sl-black/95 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="max-w-md mx-4"
          >
            <div className="bg-sl-black-light border-2 border-red-500 rounded-lg p-8 text-center space-y-6">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <AlertTriangle className="w-24 h-24 mx-auto text-red-500" />
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-red-500 uppercase">
                  Warning!
                </h2>
                <p className="text-lg">You failed to complete all daily quests.</p>
                <p className="text-sm text-muted-foreground">
                  Your streak has been broken. Stay disciplined!
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/50 rounded p-4">
                <p className="text-sm">
                  Penalty: Streak counter reset to 0
                </p>
              </div>

              <Button
                onClick={onClose}
                className="w-full bg-red-500 hover:bg-red-600 text-white"
              >
                Acknowledge
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
