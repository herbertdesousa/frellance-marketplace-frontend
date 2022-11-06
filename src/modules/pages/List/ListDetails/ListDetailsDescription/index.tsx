import { Page } from '@/types/Page';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { BreadCrumb } from '@/components';

import { ItemDetails, ItemDetailsAttribute } from '@/pages/itens/detalhes/[id]';
import ListDetailsDescriptionAttr from './ListDetailsDescriptionAttr';
import ListDetailsDescriptionBlock from './ListDetailsDescriptionBlock';

export interface SortedAttribute {
  class: string;
  attributes: ItemDetailsAttribute[];
}

const ListDetailsDescription: Page<{ item: ItemDetails }> = ({ item }) => {
  const router = useRouter();

  const addressStateCity = useMemo((): string => {
    const city = item.attributes.find(i => i.path === 'address/city');
    const state = item.attributes.find(i => i.path === 'address/state');

    if (!city || !state) return '';
    return `${city.value} - ${state.value}`;
  }, [item.attributes]);

  const [sortedAttributes, setSortedAttributes] = useState<SortedAttribute[]>(
    [],
  );

  useEffect(() => {
    const sorted: SortedAttribute[] = [];

    item.attributes.map(attr => {
      const findedSort = sorted.find(i => i.class === attr.class);
      if (findedSort) {
        findedSort.attributes.push(attr);
      } else sorted.push({ class: attr.class, attributes: [attr] });

      return attr;
    });

    setSortedAttributes(sorted);
  }, [item.attributes]);

  return (
    <div className="mt-6">
      <BreadCrumb
        data={[
          { label: 'Itens', onClick: () => router.push('/itens') },
          {
            label: item.category.name,
            onClick: () => router.push(`/itens/${item.category.slug}`),
          },
          { label: 'Detalhes' },
        ]}
      />

      <div>
        <h1 className="text-2xl font-merriweather font-bold mt-6">
          {item.name}
        </h1>
        <h2 className="text-2xl font-merriweather font-bold">
          {item.price.value}
        </h2>

        <p className="mt-3 text-gray3">{addressStateCity}</p>
      </div>

      <div className="w-full bg-gray1 my-8" style={{ height: 1 }} />

      <ListDetailsDescriptionBlock description={item.description} />

      <ListDetailsDescriptionAttr attrs={sortedAttributes} />
    </div>
  );
};

export default ListDetailsDescription;
