import { Page } from '@/types/Page';

import { useFormikContext } from 'formik';

import useSWR from 'swr';

import { FormData } from '@/pages/vender';
import { useCallback, useEffect, useState } from 'react';

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

  if (!values.category_id) return <></>;
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
