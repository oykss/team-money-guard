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
  CURRENT: '/user/current',
  TRANSACTION: {
    PATH: 'transactions',
    PATH_ID: id => `/transactions/${id}`,
  },
};

export const CATEGORY = {
  'main-expenses': { label: 'Main expenses', color: '#fed057' },
  products: { label: 'Products', color: '#ffd8d0' },
  car: { label: 'Car', color: '#fd9498' },
  'self-care': { label: 'Self care', color: '#c5baff' },
  'child-care': { label: 'Child care', color: '#6e78e8' },
  'household-products': { label: 'Household products', color: '#4a56e2' },
  education: { label: 'Education', color: '#81e1ff' },
  leisure: { label: 'Leisure', color: '#24cca7' },
  'other-expenses': { label: 'Other expenses', color: '#00ad84' },
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
];

const startYear = 2020;
const currentYear = new Date().getFullYear();
export const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
    const year = startYear + i;
    return { value: year, label: String(year) };
});

export const formatNumber = (num) => {
  return num
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export const getCategoryColor = (title) => {
        const entry = Object.entries(CATEGORY).find(
            ([, value]) => value.label === title
        );
        return entry ? entry[1].color : '#fff';
    };