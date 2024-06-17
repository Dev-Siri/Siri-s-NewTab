export function isOneDayBehind(dateString: string): boolean {
  const currentDate = new Date();

  const parsedDate = new Date(dateString);

  currentDate.setHours(0, 0, 0, 0);
  parsedDate.setHours(0, 0, 0, 0);

  return currentDate.getTime() - parsedDate.getTime() === 24 * 60 * 60 * 1000;
}

export function getNextMidnight() {
  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setHours(24, 0, 0, 0);
  return nextMidnight;
}
