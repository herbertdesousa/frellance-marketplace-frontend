import React, { useCallback } from 'react';

import { Formik, FormikHelpers } from 'formik';

import { FiTrash2 } from 'react-icons/fi';

import * as transform from '@/utils/transform';

import { adminApi } from '@/services/api';
import { useModal } from '@/hooks/modal';
import { Button, Radio, TextField, Toggle } from '@/components';

import * as Yup from 'yup';

import { Attribute } from '@/types/Attributes';
import { MdAdd, MdError } from 'react-icons/md';
import { v4 } from 'uuid';

const validationSchema = Yup.object().shape({
  required: Yup.bool().required('obrigatório'),
  order: Yup.string().required('obrigatório'),
  name: Yup.string().required('obrigatório'),
  type: Yup.string()
    .required('obrigatório')
    .oneOf(['selectable', 'writable', 'both'], 'inválido'),
  description: Yup.string(),
  values: Yup.array()
    .required('obrigatório')
    .of(
      Yup.object().shape({
        name: Yup.string().required('obrigatório'),
      }),
    )
    .when('type', {
      is: (val: string) => val === 'selectable' || val === 'both',
      then: Yup.array().min(
        1,
        'Adicione menos um item para o usuário selecionar',
      ),
    }),
});

interface FormData {
  required: boolean;
  order: number;
  name: string;
  type: 'selectable' | 'writable' | 'both';
  description: string;
  values: { id: string; name: string }[];
}

interface Props {
  refreshData(): void;
  categoryId: string;
  item?: Attribute;
}

const AdminCategoriesAttributesSave: React.FC<Props> = ({
  refreshData,
  item,
  categoryId,
}) => {
  const { modalRef } = useModal();

  const onSubmit = useCallback(
    async (data: FormData, actions: FormikHelpers<any>) => {
      try {
        await adminApi[item?.id ? 'put' : 'post'](
          'admin/categories/attributes',
          {
            ...data,
            order: Number(data.order),
            category_id: categoryId,
          },
          {
            params: { id: item?.id },
          },
        );
        modalRef.current?.close();
        refreshData();
      } catch (err: any) {
        if (err.response.status === 422) {
          actions.setErrors(err.response.data.errors);
        }
      }
    },
    [item, modalRef, refreshData],
  );

  return (
    <Formik
      initialValues={{
        name: item?.name || '',
        order: Number(item?.order) || 0,
        required: item?.required || false,
        type: 'writable' as FormData['type'],
        description: item?.description || '',
        values: item?.type === 'writable' ? [] : item?.values || [],
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        submitForm,
        isSubmitting,
        values,
        setFieldValue,
        errors,
        touched,
      }) => (
        <>
          <TextField
            name="name"
            label="Nome"
            placeholder="Digite o Nome..."
            isRequired
          />
          <TextField
            name="order"
            label="Ordem"
            placeholder="Digite a Ordem..."
            className="mt-3"
            helperText="Define a ordem dos atributos"
            formatOnChangeText={transform.onlyNumber}
            isRequired
          />
          <TextField
            name="description"
            label="Descrição"
            placeholder="Digite a Descrição..."
            className="mt-3"
            helperText="Ajuda o usuário a entender o campo"
            isTextarea
          />
          <div className="flex items-center mt-3">
            <strong className="font-medium mr-2">Campo obrigatório:</strong>
            <Toggle
              name="active"
              defaultValue={values.required}
              onChange={val => {
                setFieldValue('required', val);
              }}
            />
          </div>
          <div className="mt-3">
            <strong className="font-medium">Tipo</strong>
            <Radio
              name="type"
              value="writable"
              label="Digitável"
              onChange={() => setFieldValue('values', [])}
            />
            <Radio
              name="type"
              value="selectable"
              label="Selecionável"
              onChange={() => setFieldValue('values', [])}
            />
            <Radio
              name="type"
              value="both"
              label="Ambos"
              onChange={() => setFieldValue('values', [])}
            />
          </div>
          {values.type !== 'writable' && (
            <div>
              <ul className="mt-3">
                <div className="flex items-center justify-between">
                  <strong className="font-medium">Valores</strong>
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray3"
                    onClick={() => {
                      setFieldValue('values', [
                        ...values.values,
                        { id: v4(), name: '' },
                      ]);
                    }}
                  >
                    <MdAdd size={16} />
                    Adicionar
                  </button>
                </div>
                {values.values.map((val, index) => (
                  <li key={val.id}>
                    <div className="flex items-start">
                      <TextField
                        name={`values[${index}].name`}
                        label=""
                        className="w-full"
                        placeholder="Digite o valor"
                      />
                      <button
                        type="button"
                        className="mt-5 ml-4"
                        onClick={() => {
                          setFieldValue(
                            'values',
                            values.values.filter(i => i.id === val.id),
                          );
                        }}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {touched.values &&
                errors.values &&
                !Array.isArray(errors.values) && (
                  <div className="flex items-center text-red mt-1">
                    <MdError size={16} className="mr-1" />
                    {errors.values}
                  </div>
                )}
            </div>
          )}

          <Button onClick={submitForm} className="mt-4" disabled={isSubmitting}>
            {isSubmitting ? 'Carregando' : 'Salvar'}
          </Button>
        </>
      )}
    </Formik>
  );
};

export default AdminCategoriesAttributesSave;
