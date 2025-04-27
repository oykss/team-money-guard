import { CATEGORY } from '../constants';

export const getCategoryColor = title => (CATEGORY[title] ? CATEGORY[title] : '#fff');
