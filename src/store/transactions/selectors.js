export const selectTransactions = state => state.transactions.transactions;

export const selectIsLoading = state => state.transactions.isLoading;

export const selectIsFetching = state => state.transactions.isFetching;

export const selectHasFetched = state => state.transactions.hasFetched;
