import { parseISO, isAfter, startOfDay, setHours, setMinutes, addDays, getDay } from 'date-fns';

/**
 * Parse reset time string (HH:mm) and create a Date for today at that time
 */
export function getResetTimeToday(resetTime: string): Date {
  const [hours, minutes] = resetTime.split(':').map(Number);
  const now = new Date();
  return setMinutes(setHours(startOfDay(now), hours), minutes);
}

/**
 * Check if daily reset should occur
 * Returns true if current time is past the reset time and last reset was before today's reset time
 */
export function shouldResetDaily(
  lastResetDate: string,
  resetTime: string = '00:00'
): boolean {
  const now = new Date();
  const lastReset = parseISO(lastResetDate);
  const todayResetTime = getResetTimeToday(resetTime);

  // If we're past today's reset time and last reset was before today's reset time
  if (isAfter(now, todayResetTime) && isAfter(todayResetTime, lastReset)) {
    return true;
  }

  return false;
}

/**
 * Check if weekly reset should occur
 * Returns true if it's the reset day and we're past the reset time
 */
export function shouldResetWeekly(
  lastResetDate: string,
  weeklyResetDay: number = 0, // 0 = Sunday
  resetTime: string = '00:00'
): boolean {
  const now = new Date();
  const lastReset = parseISO(lastResetDate);
  const currentDay = getDay(now);

  // If today is not the reset day, no reset
  if (currentDay !== weeklyResetDay) {
    return false;
  }

  const todayResetTime = getResetTimeToday(resetTime);

  // If we're past today's reset time and last reset was before today's reset time
  if (isAfter(now, todayResetTime) && isAfter(todayResetTime, lastReset)) {
    return true;
  }

  return false;
}

/**
 * Get the next daily reset time
 */
export function getNextDailyReset(resetTime: string = '00:00'): Date {
  const now = new Date();
  const todayResetTime = getResetTimeToday(resetTime);

  // If we haven't passed today's reset time yet, return it
  if (isAfter(todayResetTime, now)) {
    return todayResetTime;
  }

  // Otherwise return tomorrow's reset time
  return addDays(todayResetTime, 1);
}

/**
 * Get the next weekly reset time
 */
export function getNextWeeklyReset(
  weeklyResetDay: number = 0,
  resetTime: string = '00:00'
): Date {
  const now = new Date();
  const currentDay = getDay(now);
  const todayResetTime = getResetTimeToday(resetTime);

  // Calculate days until next reset day
  let daysUntilReset = weeklyResetDay - currentDay;
  if (daysUntilReset < 0) {
    daysUntilReset += 7;
  } else if (daysUntilReset === 0 && isAfter(now, todayResetTime)) {
    daysUntilReset = 7;
  }

  return addDays(todayResetTime, daysUntilReset);
}
