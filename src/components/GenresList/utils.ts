
const genresFilter = (item: string, searchQuery: string) => {
  return searchQuery.length > 1
    ? item.toLowerCase().includes(searchQuery.toLowerCase())
    : true;
};

export { genresFilter }