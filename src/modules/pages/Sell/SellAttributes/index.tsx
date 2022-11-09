import { Page } from '@/types/Page';

import { useFormikContext } from 'formik';

import useSWR from 'swr';

import {
  FormData,
  SELL_MIN_DESCRIPTION,
  SELL_MIN_IMAGES,
} from '@/pages/vender';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Attribute } from '@/types/Attributes';
import SellAttributesItem from './SellAttributesItem';

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

  useEffect(() => {
    if (attributes.data) {
      addRequiredAttributesToAttributesField(attributes.data);
    }
  }, [attributes.data]);

  const addRequiredAttributesToAttributesField = useCallback(
    (dt: Attribute[]) => {
      setValues(st => ({
        ...st,
        attributes: dt
          .filter(item => item.required)
          .map(item => ({ id: item.id, value: '', required: true })),
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

  const [isEditingId, setIsEditingId] = useState('');

  if (!showAttributes) return <></>;
  if (!attributes.data) return <p>Carregando Atributos...</p>;
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Atributos</h2>

      <ul>
        {attributes.data &&
          attributes.data.map(item => (
            <SellAttributesItem
              key={item.id}
              attr={item}
              isEditingId={{
                set: setIsEditingId,
                state: isEditingId,
              }}
            />
          ))}
      </ul>
    </div>
  );
};

export default SellAttributes;
