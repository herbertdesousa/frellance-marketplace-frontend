import { Page } from '@/types/Page';
import { useFormikContext } from 'formik';

import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

import { Radio, TextField } from '@/components';

import { Attribute } from '@/types/Attributes';

import { FormData } from '@/pages/vender';
import { MdClose } from 'react-icons/md';

type Props = {
  isEditingId: {
    state: string;
    set: Dispatch<SetStateAction<string>>;
  };
  attr: Attribute;
};

const SellAttributesItemAttr: Page<Props> = ({ isEditingId, attr }) => {
  const { values, setValues, errors, touched } = useFormikContext<FormData>();

  const onClickEdit = useCallback(() => {
    setValues(st => {
      if (st.attributes.find(item => item.id === attr.id)) return st;

      return {
        ...st,
        attributes: [
          ...st.attributes,
          { id: attr.id, value: '', required: attr.required },
        ],
      };
    });

    isEditingId.set(attr.id);
  }, [attr, isEditingId, setValues]);

  const value = useMemo(() => {
    const fieldValue = values.attributes.find(
      item => item.id === attr.id,
    )?.value;

    if (!fieldValue) return undefined;

    if (attr.type === 'writable') return { id: '', name: fieldValue };

    const findedAttrValue = attr.values.find(i => i.id === fieldValue);

    if (!findedAttrValue) return { id: '', name: fieldValue }; // type 'both'
    return findedAttrValue; // type both | selected
  }, [attr, values.attributes]);

  const fieldIndex = useMemo(() => {
    return values.attributes.findIndex(item => item.id === attr.id);
  }, [attr.id, values.attributes]);

  const fieldErrors = useMemo(() => {
    return (
      touched?.attributes &&
      touched?.attributes[fieldIndex] &&
      errors?.attributes &&
      errors?.attributes[fieldIndex]
    );
  }, [errors?.attributes, fieldIndex, touched?.attributes]);

  return (
    <li className="mb-1">
      {isEditingId.state !== attr.id && (
        <button
          type="button"
          className={`
            flex items-center justify-between w-full p-2 border rounded text-left
            px-4 ${fieldErrors ? 'border-red' : 'border-gray1'}
            ${value ? 'border-solid' : 'border-dashed'}
          `}
          onClick={onClickEdit}
        >
          <strong className="text-black font-medium whitespace-pre-wrap">
            {attr.name}
            {attr.required && <span className="text-red ml-1">*</span>}
          </strong>

          <div className="whitespace-nowrap">
            {!value && (
              <span
                className={`italic ml-4 ${
                  fieldErrors ? 'text-red' : 'text-gray2'
                }`}
              >
                Não Preechido
              </span>
            )}
            {value && (
              <span className="ml-4 text-black text-right">{value.name}</span>
            )}
          </div>
        </button>
      )}
      {isEditingId.state === attr.id && (
        <div className="rounded border border-gray2">
          <div className="flex justify-between items-center py-2 px-4 border-b border-b-gray1">
            <strong className="font-medium">{attr.name}</strong>
            <button
              type="button"
              className="flex items-center text-gray2 transition hover:text-gray3 text-sm"
              onClick={() => isEditingId.set('')}
            >
              <MdClose size={16} className="mr-1" />
              Fechar
            </button>
          </div>

          <div className="px-4 py-2">
            {(attr.type === 'selectable' || attr.type === 'both') && (
              <div
                className={`
                ${attr.type === 'both' ? 'mb-2' : ''}
                grid grid-cols-2
              `}
              >
                {attr.values.map(val => (
                  <Radio
                    key={val.id}
                    name={`attributes[${fieldIndex}].value`}
                    label={val.name}
                    className="flex-1 whitespace-nowrap"
                    value={val.id}
                    onChange={() => isEditingId.set('')}
                  />
                ))}
              </div>
            )}
            {(attr.type === 'writable' || attr.type === 'both') && (
              <div className="flex items-end">
                <TextField
                  name={`attributes[${fieldIndex}].value`}
                  label=""
                  placeholder="Digite..."
                  className="flex-1"
                  autoFocus={attr.type === 'writable'}
                  value={value?.id ? '' : values.attributes[fieldIndex].value}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default SellAttributesItemAttr;
