import { API_PATHS } from '../constants';
import { refresh } from '../store/auth/operations';

let refreshTokenPromise;
const METHODS = ['post', 'patch', 'delete'];

export const createUpdateAuthInterceptor = (store, http) => async error => {
  const status = error?.response?.status;
  const config = error?.config;

  const paths = config?.url.split('/').filter(e => e);

  if (!config._retry) {
    config._retry = 0;
  }

  if (status === 401 && config._retry < 1) {
    config._retry += 1;

    if (!refreshTokenPromise) {
      refreshTokenPromise = store.dispatch(refresh());
    }

    try {
      const refreshResponse = await refreshTokenPromise;

      if (
        paths.includes(API_PATHS.TRANSACTION.PATH) &&
        METHODS.includes(config?.method)
      ) {
        const newAccessToken = refreshResponse?.payload?.data?.accessToken;

        if (newAccessToken) {
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        } else {
          return;
        }

        return http(error.config);
      }
    } finally {
      refreshTokenPromise = null;
    }
  }

  return Promise.reject(error);
};
