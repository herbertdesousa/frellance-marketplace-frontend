import { Page } from '@/types/Page';
import { useCallback, useState } from 'react';

import { Item } from '@/types/Item';

import { useModal } from '@/hooks/modal';

import useSWR from 'swr';
import { adminApi } from '@/services/api';

import AdminDashHeroNonSelected from './AdminDashHeroNonSelected';
import AdminDashHeroSelected from './AdminDashHeroSelected';

export type ItemSelect = Item & { selectedOnHome: boolean };

const AdminDashHero: Page = () => {
  const { modalRef } = useModal();

  const [searchText, setSearchText] = useState('');
  const order = searchText ? '' : 'order=desc';
  const nonSelectedSWR = useSWR<ItemSelect[]>(
    `/categories/items?${order}&limit=5&search=${searchText}&onHomeHero=false`,
    { revalidateOnFocus: false },
  );

  const selectedSWR = useSWR<ItemSelect[]>(
    `/categories/items?onHomeHero=true`,
    { revalidateOnFocus: false },
  );

  const removeFromHomeHero = useCallback(async (itemId: string) => {
    await adminApi.delete('admin/item-hero', { params: { itemId } });
    await selectedSWR.mutate();
    await nonSelectedSWR.mutate();
  }, []);

  const addToHomeHero = useCallback(async (itemId: string) => {
    try {
      await adminApi.post('/admin/item-hero', { itemId });
      await nonSelectedSWR.mutate();
      await selectedSWR.mutate();
    } catch (err) {
      modalRef.current?.open({
        title: 'Limite excedido',
        children: <p>Este é o máximo de itens adicionáveis na Home</p>,
      });
    }
  }, []);

  return (
    <div className="relative max-width">
      <h1 className="text-2xl font-merriweather font-bold mt-8">
        Seleção de Produtos na Home
      </h1>

      <AdminDashHeroSelected
        data={selectedSWR.data}
        removeFromHomeHero={removeFromHomeHero}
      />

      <AdminDashHeroNonSelected
        data={nonSelectedSWR.data}
        searchText={{ value: searchText, set: setSearchText }}
        addToHomeHero={addToHomeHero}
      />
    </div>
  );
};

export default AdminDashHero;
