import axios from 'axios';
import { API_PATHS } from './../constants/api-paths';

export const baseURL = import.meta.env.VITE_API_BASE_URL;

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
