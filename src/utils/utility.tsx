export const capitalize = (text: string) => {
  if (!text) return "";
  const capitalizedText = text.toLowerCase();
  return capitalizedText.charAt(0).toUpperCase() + capitalizedText.slice(1);
};
