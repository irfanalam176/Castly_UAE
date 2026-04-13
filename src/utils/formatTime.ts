type DateInput = string | Date | number | null | undefined;

export function formatTime(input: DateInput): string {
  if (!input) return 'just now';

  const date = new Date(input);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();

  if (isNaN(diffMs) || diffMs < 0) return 'just now';

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  if (hours >= 1) {
    return `${hours} hr${hours > 1 ? 's' : ''} ago`;
  }

  if (minutes >= 1) {
    return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  }

  return 'just now';
}
