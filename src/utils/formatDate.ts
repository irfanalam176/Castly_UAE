export const formatDate = (dateInput: string | Date | null | undefined): string => {
  // Handle null/undefined cases
  if (!dateInput) {
    return 'N/A'; // or return '' for empty string
  }

  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  // Options for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  return date.toLocaleDateString('en-US', options);
};

export const formatCurrency = (amount: number): string => {
  return `AED ${Math.round(amount).toLocaleString()}`
}