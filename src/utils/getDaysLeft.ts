export const getDaysLeft = (targetDate: string): number => {
  const now = Date.now();
  const target = new Date(targetDate).getTime();

  const diff = target - now;

  const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return Math.max(daysLeft, 0);
};