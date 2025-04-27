export const formatNumber = (num, { currency = false } = {}) => {
  return num.toLocaleString('uk', {
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...(currency && {
      style: 'currency',
      currency: 'UAH',
      currencyDisplay: 'narrowSymbol',
    }),
  });
};
