import React, { useCallback, useMemo } from 'react';

import { Formik, FormikHelpers } from 'formik';

import * as Icons from 'react-icons/fi';

import * as transform from '@/utils/transform';

import { adminApi } from '@/services/api';
import { useModal } from '@/hooks/modal';
import { Button, TextField } from '@/components';

import { MdCameraAlt, MdClose, MdError } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import * as Yup from 'yup';

import Image from 'next/image';
import { AdminCategory } from '..';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('obrigatório'),
  relevance: Yup.string().required('obrigatório'),
  img: Yup.string().required('imagem obrigatório'),
  iconName: Yup.string().required('obrigatório'),
});

interface FormData {
  name: string;
  relevance: string;
  img: File | undefined | string;
  iconName: string;
}

interface Props {
  refreshData(): void;
  item?: AdminCategory;
}

function functionName(fun: any) {
  let ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  ret = ret.replace(/ /g, '');
  return ret;
}

const AdminCategoriesSave: React.FC<Props> = ({ refreshData, item }) => {
  const { modalRef } = useModal();

  const onSubmit = useCallback(
    async (data: FormData, actions: FormikHelpers<any>) => {
      if (data.img === undefined) {
        actions.setErrors({ img: 'obrigatório' });
        return;
      }
      try {
        const form = new FormData();

        form.append('name', data.name);
        form.append('relevance', data.relevance);
        if (typeof data.img !== 'string') form.append('img', data.img);
        form.append('slug', transform.parseSlug(data.name));
        form.append('iconName', data.iconName);

        await adminApi[item?.id ? 'put' : 'post']('admin/categories', form, {
          params: { id: item?.id },
        });
        modalRef.current?.close();
        refreshData();
      } catch (err: any) {
        if (err.response.status === 422) {
          actions.setErrors(err.response.data.errors);
        }
      }
    },
    [item?.id, modalRef, refreshData],
  );

  const findIcon = useCallback((iconName: string) => {
    const icon = Object.entries(Icons).find(([name]) => name === iconName);

    if (!icon) return <></>;

    const Component = icon[1];
    return <Component size={24} />;
  }, []);

  return (
    <Formik
      initialValues={{
        name: item?.name || '',
        relevance: String(item?.relevance) || '',
        img: item?.img_url || undefined,
        iconName: functionName(item?.Icon) || '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        submitForm,
        isSubmitting,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <>
          <div>
            {values.img && (
              <div className="flex items-center justify-center">
                <div className="relative">
                  {typeof values.img === 'string' && (
                    <Image
                      src={values.img}
                      alt="imagem da categoria"
                      height={96}
                      width={96}
                      objectFit="cover"
                    />
                  )}
                  {typeof values.img !== 'string' && (
                    <img
                      src={URL.createObjectURL(values.img)}
                      alt="imagem da categoria"
                      className="h-24 w-24 object-cover"
                    />
                  )}

                  <button
                    type="button"
                    className="absolute top-0 right-0 p-1.5 flex items-center bg-red text-white"
                    onClick={() => setFieldValue('img', undefined)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            )}
            {!values.img && (
              <label
                htmlFor="upload"
                // className="absolute cursor-pointer bottom-2 right-0 p-1.5 bg-primary text-white rounded-full z-20"
                className="
              flex items-center justify-center border border-dashed border-gray1 p-2 cursor-pointer text-black
              transition hover:border-gray2
            "
              >
                <MdCameraAlt size={24} className="mr-2" />
                Selecionar Imagem
                <input
                  id="upload"
                  type="file"
                  name="picture"
                  accept=".png,.jpeg,.jpg,.webp"
                  disabled={isSubmitting}
                  className="hidden"
                  onChange={evt => {
                    if (evt.target.files)
                      setFieldValue('img', evt.target.files[0]);
                  }}
                />
              </label>
            )}
            {!!errors.img && !!touched.img && (
              <div className="flex items-center bg-red-opaque text-red px-1 rounded mt-2">
                <MdError size={16} />
                <p className="ml-2">{errors.img}</p>
              </div>
            )}
          </div>

          <TextField
            name="name"
            label="Nome"
            placeholder="Digite o Nome..."
            className="mt-3"
            helperText={`Rota da Página: /${transform.parseSlug(values.name)}`}
          />
          <TextField
            type="number"
            name="relevance"
            label="Relevância (numero)"
            placeholder="Digite a Relevância"
            helperText="Define a ordem das categorias"
            formatOnChangeText={transform.onlyNumber}
            className="mt-3"
          />
          <div className="mt-3">
            <span className="flex font-medium mb-1">Selecione o Icone</span>
            {!values.iconName && (
              <ul
                className="
                  grid grid-cols-8 md:grid-cols-12 gap-y-2 max-h-32 overflow-scroll
                  no-scroll border border-gray1 p-2
                "
              >
                {Object.entries(Icons).map(([name, Icon]) => (
                  <button
                    type="button"
                    key={name}
                    onClick={() => setFieldValue('iconName', name)}
                  >
                    <Icon size={20} />
                  </button>
                ))}
              </ul>
            )}
            {values.iconName && (
              <div className="flex items-center justify-between">
                <div className="p-2 border border-gray1 rounded">
                  {findIcon(values.iconName)}
                </div>
                <button
                  className="flex ml-2 items-center text-gray3"
                  type="button"
                  onClick={() => setFieldValue('iconName', '')}
                >
                  <MdClose className="mr-1" />
                  trocar icone
                </button>
              </div>
            )}
          </div>

          <Button onClick={submitForm} className="mt-4" disabled={isSubmitting}>
            {isSubmitting ? 'Carregando' : 'Salvar'}
          </Button>
        </>
      )}
    </Formik>
  );
};

export default AdminCategoriesSave;
