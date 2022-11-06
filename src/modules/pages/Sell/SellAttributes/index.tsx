import { Page } from '@/types/Page';

import { useFormikContext } from 'formik';

import useSWR from 'swr';

import {
  FormData,
  SELL_MIN_DESCRIPTION,
  SELL_MIN_IMAGES,
} from '@/pages/vender';
import { useCallback, useEffect, useMemo, useState } from 'react';

import SellAttributesItem from './SellAttributesItem';

type AttributesBase = {
  attributes_id: string;
  required: boolean;
  order: number;
  name: string;
  description: string;
  class: string;
};
type AttributeWritable = {
  type: 'writable';
} & AttributesBase;
type AttributeSelectableOrBoth = {
  type: 'selectable' | 'both';
  values: {
    id: string;
    name: string;
  }[];
} & AttributesBase;
export type Attribute = AttributeWritable | AttributeSelectableOrBoth;

export interface SortedAttribute {
  class: string;
  attributes: Attribute[];
}

const SellAttributes: Page = () => {
  const { values, setValues, setErrors, setTouched } =
    useFormikContext<FormData>();

  const attributes = useSWR<Attribute[]>(
    values.category_id && `/categories/attributes?id=${values.category_id}`,
    { revalidateOnFocus: false },
  );

  const [sortedAttributes, setSortedAttributes] = useState<SortedAttribute[]>(
    [],
  );

  useEffect(() => {
    if (attributes.data) {
      const sorted: SortedAttribute[] = [];

      attributes.data.map(attr => {
        const findedSort = sorted.find(item => item.class === attr.class);
        if (findedSort) {
          findedSort.attributes.push(attr);
          findedSort.attributes.sort((a, b) => a.order - b.order);
        } else sorted.push({ class: attr.class, attributes: [attr] });

        return attr;
      });

      setSortedAttributes(sorted);
      addRequiredAttributesToAttributesField(attributes.data);
    }
  }, [attributes.data]);

  const addRequiredAttributesToAttributesField = useCallback(
    (dt: Attribute[]) => {
      setValues(st => ({
        ...st,
        attributes: dt
          .filter(item => item.required)
          .map(item => ({ id: item.attributes_id, value: '', required: true })),
      }));
      setErrors({ attributes: undefined });
      setTouched({ attributes: undefined });
    },
    [setErrors, setTouched, setValues],
  );

  const showAttributes = useMemo(() => {
    return (
      values.imgs.length >= SELL_MIN_IMAGES &&
      values.name &&
      values.description.length >= SELL_MIN_DESCRIPTION &&
      values.price.type &&
      values.price.value &&
      values.category_id
    );
  }, [
    values.description,
    values.imgs.length,
    values.name,
    values.price.type,
    values.price.value,
    values.category_id,
  ]);

  if (!showAttributes) return <></>;
  if (!attributes.data) return <p>Carregando Atributos...</p>;
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Atributos</h2>

      <ul>
        {sortedAttributes.map(item => (
          <SellAttributesItem key={item.class} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default SellAttributes;
