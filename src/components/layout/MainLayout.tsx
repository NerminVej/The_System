'use client';

import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { LevelUpAnimation } from '@/components/stats/LevelUpAnimation';
import { PunishmentModal } from '@/components/punishment/PunishmentModal';
import { useQuestReset } from '@/hooks/useQuestReset';
import { usePunishment } from '@/hooks/usePunishment';
import { useLevelUp } from '@/hooks/useLevelUp';
import { Toaster } from 'react-hot-toast';

export function MainLayout({ children }: { children: React.ReactNode }) {
  // Initialize quest reset checking
  useQuestReset();

  // Handle punishment modal
  const { showPunishment, onPunishmentClose } = usePunishment();

  // Handle level up animation
  const { showLevelUp, newLevel, onLevelUpComplete } = useLevelUp();

  return (
    <>
      <div className="min-h-screen bg-sl-black relative">
        <Navbar />
        <main className="pb-20 md:pb-8 relative z-[5]">{children}</main>
        <MobileNav />
      </div>

      <LevelUpAnimation
        show={showLevelUp}
        newLevel={newLevel}
        onComplete={onLevelUpComplete}
      />

      <PunishmentModal show={showPunishment} onClose={onPunishmentClose} />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(13, 18, 25, 0.95)',
            color: '#fff',
            border: '1px solid rgba(0, 212, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#00d4ff',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}
