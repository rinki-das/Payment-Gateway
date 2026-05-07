export const formatCardNumber = (
  value: string
) => {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

export const formatExpiryDate = (
  value: string
) => {
  const cleaned = value
    .replace(/\D/g, "")
    .slice(0, 4);

  if (cleaned.length < 3) {
    return cleaned;
  }

  return `${cleaned.slice(
    0,
    2
  )}/${cleaned.slice(2)}`;
};