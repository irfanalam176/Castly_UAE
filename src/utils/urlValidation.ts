export const isValidUrl = (url: string) => {
  const pattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
  return pattern.test(url.trim());
};