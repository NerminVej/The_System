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
import { HabitType } from '@/types';
import { Plus } from 'lucide-react';

interface CreateHabitDialogProps {
  onCreateHabit: (name: string, type: HabitType) => void;
}

export function CreateHabitDialog({ onCreateHabit }: CreateHabitDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<HabitType>('good');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreateHabit(name, type);
      setName('');
      setType('good');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-sl-cyan hover:bg-sl-cyan/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-sl-black-light border-sl-cyan/50">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Habit</DialogTitle>
            <DialogDescription>
              Track a good habit or resist a bad one.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Habit Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter habit name"
                className="bg-sl-black border-sl-cyan/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Habit Type</Label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as HabitType)}
                className="w-full rounded-md border border-sl-cyan/30 bg-sl-black px-3 py-2 text-sm"
              >
                <option value="good">Good Habit (Willpower +1 on check)</option>
                <option value="bad">Bad Habit (Willpower +1 on check)</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-sl-cyan hover:bg-sl-cyan/90">
              Create Habit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
