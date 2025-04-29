export const ROUTES = {
  HOME: '/',
  STATISTICS: 'statistics',
  CURRENCY: 'currency',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const API_PATHS = {
  AUTH: '/auth',
  LOGIN: '/login',
  REGISTER: '/register',
  REFRESH: '/refresh',
  LOGOUT: '/logout',
  USER: {
    CURRENT: '/user/current',
    NAME: '/user/name',
    PHOTO: '/user/photo',
    PATH: 'user',
  },
  TRANSACTION: {
    PATH: 'transactions',
    PATH_ID: id => `/transactions/${id}`,
    SUMMARY: date => `/transactions/summary?period=${date}`,
  },
  CATEGORIES: '/categories',
};

export const CATEGORY = {
  'Main expenses': '#fed057',
  Products: '#ffd8d0',
  Car: '#fd9498',
  'Self care': '#c5baff',
  'Child care': '#6e78e8',
  'Household products': '#4a56e2',
  Education: '#81e1ff',
  Leisure: '#24cca7',
  'Other expenses': '#00ad84',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const START_YEAR = 2020;
const CURRENT_YEAR = new Date().getFullYear();

export const YEARS = Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, i) => {
  const year = START_YEAR + i;
  return { value: year, label: String(year) };
});
