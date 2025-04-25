export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectIsLoading = state => state.auth.isLoading;

export const selectTokenTimestamp = state => state.auth.tokenTimestamp;

export const selectToken = state => state.auth.token;

export const selectWasLogout = state => state.auth.wasLogout;
