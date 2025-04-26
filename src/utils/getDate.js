export const getDate = date => {
  const unformattedDate = new Date(date);
  const day = String(unformattedDate.getDate()).padStart(2, '0');
  const month = String(unformattedDate.getMonth() + 1).padStart(2, '0');
  const year = unformattedDate.getFullYear();
  return `${day}.${month}.${year}`;
};
