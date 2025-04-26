export const findCategoryTitle = (categoryId, expenseCat) => {
  if (!expenseCat || expenseCat.length === 0) return 'Loading...';
  const category = expenseCat.find(exp => exp._id === categoryId);
  return category ? category.title : 'Income';
};
