// export const formatIban = (value: string) => {
//   // FORMAT THE IABN
//   let cleaned = value.replace(/[^a-zA-Z0-9]/g, '');

//   if (cleaned.length > 4) {
//     cleaned = cleaned.replace(/(.{4})(?=.)/g, '$1 ');
//   }

//   return cleaned.toLocaleUpperCase();
// };

export const formatIban = (iban: string) => {
  // Remove anything not letter or number
  const clean = iban.replace(/[^A-Za-z0-9]/g, '');

  // Optional: insert spaces every 4 characters
  return clean.replace(/(.{4})/g, '$1 ').trim();
};
