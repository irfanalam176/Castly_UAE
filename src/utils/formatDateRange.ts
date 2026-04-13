
export const formatDateRange = (
  startDate: string | Date,
  endDate: string | Date
): string => {
  if (!startDate || !endDate) return '';

  const start: Date = new Date(startDate);
  const end: Date = new Date(endDate);

  // Same exact day → "Jan 23, 2026"
  if (start.toDateString() === end.toDateString()) {
    return start.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  const sameMonthAndYear =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();

  const monthDayOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };

  const year: number = start.getFullYear();

  if (sameMonthAndYear) {
    return `${start.toLocaleDateString(
      'en-US',
      monthDayOptions
    )}–${end.getDate()}, ${year}`;
  }

  return `${start.toLocaleDateString(
    'en-US',
    monthDayOptions
  )} – ${end.toLocaleDateString('en-US', monthDayOptions)}, ${year}`;
};
