export function isOneDayBehind(dateString: string): boolean {
  const currentDate = new Date();

  const parsedDate = new Date(dateString);

  currentDate.setHours(0, 0, 0, 0);
  parsedDate.setHours(0, 0, 0, 0);

  return currentDate.getTime() - parsedDate.getTime() === 24 * 60 * 60 * 1000;
}
