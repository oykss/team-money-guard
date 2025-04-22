import axios from 'axios';
import { API_PATHS } from '../constants';
import { refresh } from '../store/auth/operations';
import { store } from '../store/store';

export const baseURL = import.meta.env.VITE_API_BASE_URL;
let refreshTokenPromise;

export const apiAuth = axios.create({
  baseURL: baseURL + API_PATHS.AUTH,
  withCredentials: true,
});

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const apiMono = axios.create({
  baseURL: 'https://api.monobank.ua/bank/currency',
});

const createUpdateAuthInterceptor = (store, http) => async error => {
  const status = error?.response?.status;

  if (status === 401) {
    if (!refreshTokenPromise) {
      refreshTokenPromise = store.dispatch(refresh());
    }

    try {
      await refreshTokenPromise;
      return http(error.config);
    } finally {
      refreshTokenPromise = null;
    }
  }

  return Promise.reject(error);
};

const updateAuthCb = createUpdateAuthInterceptor(store, apiAuth);
api.interceptors.response.use(null, updateAuthCb);
