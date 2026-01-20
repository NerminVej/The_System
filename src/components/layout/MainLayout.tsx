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
      <div className="min-h-screen bg-sl-black">
        <Navbar />
        <main className="pb-20 md:pb-8">{children}</main>
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
            background: '#141824',
            color: '#fff',
            border: '1px solid rgba(139, 92, 246, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#8b5cf6',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}
