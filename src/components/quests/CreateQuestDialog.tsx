'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QuestType, QuestFrequency } from '@/types';
import { Plus } from 'lucide-react';

interface CreateQuestDialogProps {
  frequency: QuestFrequency;
  onCreateQuest: (title: string, type: QuestType, description?: string) => void;
}

export function CreateQuestDialog({ frequency, onCreateQuest }: CreateQuestDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<QuestType>('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreateQuest(title, type, description || undefined);
      setTitle('');
      setDescription('');
      setType('general');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-sl-cyan hover:bg-sl-cyan/90">
          <Plus className="mr-2 h-4 w-4" />
          Add {frequency === 'daily' ? 'Daily' : 'Weekly'} Quest
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-sl-black-light border-sl-cyan/50">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create {frequency === 'daily' ? 'Daily' : 'Weekly'} Quest</DialogTitle>
            <DialogDescription>
              Add a new quest to track your progress.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quest title"
                className="bg-sl-black border-sl-cyan/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter quest description"
                className="bg-sl-black border-sl-cyan/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Quest Type</Label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as QuestType)}
                className="w-full rounded-md border border-sl-cyan/30 bg-sl-black px-3 py-2 text-sm"
              >
                <option value="general">General (No stat reward)</option>
                <option value="workout">Workout (Strength +1)</option>
                <option value="endurance">Endurance (Stamina +1)</option>
                <option value="skill">Skill (Agility +1)</option>
                <option value="intelligence">Intelligence (Intelligence +1)</option>
                <option value="willpower">Willpower (Willpower +1)</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-sl-cyan hover:bg-sl-cyan/90">
              Create Quest
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
