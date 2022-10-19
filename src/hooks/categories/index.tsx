import { useContext, createContext, useMemo } from 'react';
import { Page } from '@/types/Page';

import useSWR from 'swr';
import * as Icons from 'react-icons/fi';

import { Category } from '@/types/Category';

const CategoriesContext = createContext<CategoriesType>({} as CategoriesType);

function useCategories(): CategoriesType {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error('useCustomers must be used within an CustomersContext');
  }

  return context;
}

interface ResponseCategory {
  id: string;
  name: string;
  iconName: string;
  img_url: string;
  slug: string;
}

interface CategoriesType {
  data: Category[];
}

const CategoriesProvider: Page = ({ children }) => {
  const { data } = useSWR<ResponseCategory[]>('/categories', {
    revalidateOnFocus: false,
  });

  const formattedData = useMemo((): Category[] => {
    if (!data) return [];

    return data.map(item => ({
      ...item,
      Icon: Icons[item.iconName as 'FiActivity'],
    }));
  }, [data]);

  return (
    <CategoriesContext.Provider
      value={{
        data: formattedData,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesProvider, useCategories };
