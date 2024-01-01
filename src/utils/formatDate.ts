export const formatDate = (dateNumber: string) => {
  const dateObject = new Date(dateNumber);

  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear().toString().slice(-4);

  return `${day}/${month}/${year}`;
};
