export const sanitizeText = (text) => {
  if (typeof text !== "string") return "";
  return text.trim();
};