export const isFutureExpiryDate = (
  expiry: string
) => {
  const [month, year] =
    expiry.split("/");

  if (!month || !year) {
    return false;
  }

  const expiryDate = new Date(
    Number(`20${year}`),
    Number(month)
  );

  return expiryDate > new Date();
};