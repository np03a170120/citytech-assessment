export const capitalize = (text: string) => {
  if (!text) return "";
  const country = text.toLowerCase();
  return country.charAt(0).toUpperCase() + country.slice(1);
};
