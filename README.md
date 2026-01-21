# The System - Solo Leveling Self-Improvement App

A Solo Leveling-inspired self-improvement system built with Next.js 14, TypeScript, Tailwind CSS, and Zustand for state management.

## Features

### 🎯 Quest System
- **Daily Quests**: Reset at midnight; must complete ALL to maintain streak
- **Weekly Quests**: Reset on configured day (default: Sunday)
- Quest types reward specific stats:
  - Workout → Strength +1
  - Endurance → Stamina +1
  - Skill → Agility +1
  - Deep Work → Intelligence +1
  - Completing ALL daily quests → Willpower +1

### 📊 Stats & Leveling
- **5 Core Stats**: Strength, Stamina, Intelligence, Agility, Willpower
- Each stat goes from 0-10
- Player level = minimum of all stat levels
- Level up when all stats reach the next tier together
- Dramatic level-up animations

### 💪 Habit Tracker
- Track **Good Habits**: Completing grants +1 Willpower
- Resist **Bad Habits**: Resisting grants +1 Willpower
- Willpower can go negative (capped at -5)
- Visual warnings when Willpower is low

### 🧠 Deep Work Timer
- 30-minute focus sessions
- Completing a session grants +1 Intelligence
- Timer persists across browser refreshes
- Pause, resume, and cancel functionality

### 🔥 Punishment & Streak System
- Streak counter tracks consecutive days with all daily quests completed
- Missing daily quests triggers punishment modal
- Breaks your streak (but doesn't decrease stats)
- Longest streak tracking

### 📅 Activity Heatmap
- GitHub-style calendar showing 365 days of activity
- Color intensity based on daily activity
- Tracks quests completed, habits logged, and stats gained
- Hover tooltips with daily details

### ⚙️ Settings
- Configure daily reset time (default: midnight)
- Configure weekly reset day (default: Sunday)
- Export data to JSON for backup
- Import data from JSON backup
- Reset all data (with confirmation)

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Zustand** for state management with localStorage persistence
- **Framer Motion** for animations
- **date-fns** for date utilities
- **react-hot-toast** for notifications
- **Lucide React** for icons

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Usage Guide

### Creating Your First Quest

1. Navigate to the **Quests** page
2. Click "Add Daily Quest" or "Add Weekly Quest"
3. Enter quest details:
   - Title (required)
   - Description (optional)
   - Quest Type (determines stat reward)
4. Complete quests by checking the checkbox
5. Watch your stats grow!

### Building Habits

1. Go to the **Habits** page
2. Click "Add Habit"
3. Choose habit type:
   - **Good Habit**: Click "Done" to complete → Willpower +1
   - **Bad Habit**: Click "Resisted" when you resist → Willpower +1
4. Track your Willpower stat in real-time

### Deep Work Sessions

1. Find the Deep Work Timer on the Dashboard or create a shortcut
2. Click "Start Session" to begin 30-minute focus time
3. The timer persists even if you close the browser
4. Click "Claim Reward" when complete → Intelligence +1

### Maintaining Your Streak

- Complete ALL daily quests before the reset time
- Check the streak counter on the Dashboard
- Missing quests triggers a punishment modal and breaks your streak
- Track your longest streak for motivation

### Backing Up Your Data

1. Go to **Settings**
2. Click "Export Data" to download a JSON backup
3. Store the backup file safely
4. Use "Import Data" to restore from backup

## Game Mechanics

### Stat Progression
- 1 action = 1 XP = 1 stat level
- Each stat maxes at level 10
- Player level = minimum of all stats

### Willpower Stat
- Can go negative (minimum: -5)
- Good habits and resisting bad habits increase it
- Failing to resist bad habits decreases it
- Visual warnings at negative levels

### Quest Reset Logic
- Checks on app load and every 60 seconds
- Daily: Resets at configured time (default midnight)
- Weekly: Resets on configured day at reset time
- Incomplete daily quests trigger punishment

## Solo Leveling Theme

The app features a dark, futuristic aesthetic inspired by Solo Leveling:
- Dark backgrounds (#0a0e1a, #141824)
- Purple accent (#8b5cf6)
- Blue accent (#3b82f6)
- Glowing effects on interactive elements
- Dramatic animations for level-ups
- Sharp, angular card designs

## Data Persistence

All data is stored in browser localStorage:
- `the-system-stats`: Stats and player level
- `the-system-quests`: Daily/weekly quests, streaks
- `the-system-habits`: Habit definitions and logs
- `the-system-activities`: Daily activity for heatmap
- `the-system-settings`: User preferences
- `the-system-deep-work`: Deep work timer state

## Development

### Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard
│   ├── quests/page.tsx
│   ├── habits/page.tsx
│   ├── stats/page.tsx
│   └── settings/page.tsx
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── stats/            # Stat-related components
│   ├── quests/           # Quest system components
│   ├── habits/           # Habit tracker components
│   ├── heatmap/          # Activity heatmap
│   ├── punishment/       # Punishment modal, streak counter
│   ├── deepwork/         # Deep work timer
│   ├── layout/           # Layout components (Navbar, etc.)
│   ├── dashboard/        # Dashboard components
│   └── settings/         # Settings components
├── store/                # Zustand stores
├── lib/                  # Utilities and constants
├── types/                # TypeScript type definitions
└── hooks/                # Custom React hooks
```

### Key Files

- `src/store/*.ts`: State management with localStorage
- `src/lib/levelingSystem.ts`: Core game logic
- `src/lib/questReset.ts`: Reset detection logic
- `src/hooks/useQuestReset.ts`: Quest reset hook
- `src/hooks/useLevelUp.ts`: Level up detection
- `src/hooks/usePunishment.ts`: Punishment modal logic
- `src/hooks/useDeepWork.ts`: Deep work timer logic

## Contributing

This is a single-user self-improvement app. Feel free to fork and customize for your own use!

## License

MIT

## Credits

Inspired by the Solo Leveling manhwa/anime series.