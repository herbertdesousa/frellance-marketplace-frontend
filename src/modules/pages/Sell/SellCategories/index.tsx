import { Page } from '@/types/Page';
import { useCallback, useMemo } from 'react';
import { MdClose, MdError } from 'react-icons/md';

import { useFormikContext } from 'formik';

import { useCategories } from '@/hooks/categories';
import { useModal } from '@/hooks/modal';
import { Button } from '@/components';
import { FormData } from '@/pages/vender';

const SellCategories: Page = () => {
  const { values, setFieldValue, touched, errors } =
    useFormikContext<FormData>();
  const { modalRef } = useModal();
  const categories = useCategories();

  const categorySelected = useMemo(() => {
    if (!values.category_id) return undefined;

    return categories.data.find(item => item.id === values.category_id);
  }, [categories.data, values.category_id]);

  const onClearCategory = useCallback(() => {
    const clearCategory = () => {
      setFieldValue('category_id', '');
      modalRef.current?.close();
    };

    const findedAttributeFilled = values.attributes.find(
      item => item.value !== '',
    );

    if (!findedAttributeFilled) {
      clearCategory();
      return;
    }

    modalRef.current?.open({
      title: 'Limpar categoria',
      children: (
        <>
          <p className="text-gray3">
            Você tem certeza que deseja limpar a categoria e perder atributos já
            preenchidos?
          </p>
          <div className="flex gap-x-4 mt-4">
            <Button onClick={clearCategory}>Sim, Deletar</Button>
            <Button variant="outline" onClick={() => modalRef.current?.close()}>
              Cancelar
            </Button>
          </div>
        </>
      ),
    });
  }, [values.attributes, modalRef, setFieldValue]);

  const categoriesError = useMemo(() => {
    return (
      touched.category_id && errors.category_id && String(errors.category_id)
    );
  }, [errors.category_id, touched.category_id]);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">
        Qual a categoria do seu item?
      </h2>

      {!categorySelected && (
        <ul className="grid grid-cols-2 md:grid-cols-3 no-scroll gap-4">
          {categories.data.map(item => (
            <li key={item.id}>
              <button
                type="button"
                className="
                    flex flex-col items-center w-full py-8 border border-dashed rounded
                    transition border-gray2 hover:bg-gray0.5
                  "
                onClick={() => setFieldValue('category_id', item.id)}
              >
                <item.Icon size={24} />
                <strong className="mt-2 text-black font-medium">
                  {item.name}
                </strong>
              </button>
            </li>
          ))}
        </ul>
      )}
      {categorySelected && (
        <div className="flex items-center">
          <div
            className="
                flex items-center w-full p-4 border border-dashed rounded
                border-primary bg-primary-opaque text-primary
              "
          >
            <categorySelected.Icon size={24} />
            <strong className="text-black font-medium ml-4">
              {categorySelected.name}
            </strong>
          </div>
          <button
            type="button"
            className="text-gray3 ml-4 transition hover:text-black"
            onClick={onClearCategory}
          >
            <MdClose size={24} />
          </button>
        </div>
      )}
      {categoriesError && (
        <div className="flex items-center text-red mt-1">
          <MdError size={16} className="mr-1" />
          {categoriesError}
        </div>
      )}
    </div>
  );
};

export default SellCategories;
