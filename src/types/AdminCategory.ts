import { Category } from '@/types/Category';

export type ResponseCategory = Omit<Category, 'Icon'> & {
  iconName: string;
  items: number;
};
export type AdminCategory = Category & { items: number };
