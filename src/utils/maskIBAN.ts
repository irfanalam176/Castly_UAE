 export const maskIBAN = (iban = '') => {
  if (!iban) return '';
  const last4 = iban.slice(-4);
  return `•••• •••• •••• ${last4}`;
};
