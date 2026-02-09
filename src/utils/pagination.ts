export const paginate = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  const start = (currentPage - 1) * itemsPerPage;
  return items.slice(start, start + itemsPerPage);
};

export const getTotalPages = (
  totalItems: number,
  itemsPerPage: number
): number => {
  return Math.ceil(totalItems / itemsPerPage);
};
