import { refresh } from '../store/auth/operations';

let refreshTokenPromise;

export const createUpdateAuthInterceptor = store => async error => {
  const status = error?.response?.status;
  const config = error?.config;

  if (!config._retry) {
    config._retry = 0;
  }

  if (status === 401 && config._retry < 1) {
    config._retry += 1;

    if (!refreshTokenPromise) {
      refreshTokenPromise = store.dispatch(refresh());
    }

    try {
      await refreshTokenPromise;
    } finally {
      refreshTokenPromise = null;
    }
  }

  return Promise.reject(error);
};
