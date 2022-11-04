import { Page } from '@/types/Page';
import { useCallback } from 'react';

import * as Icons from 'react-icons/fa';

import { Button, TextField, Toggle } from '@/components';
import { useModal } from '@/hooks/modal';

import { Formik } from 'formik';
import { adminApi } from '@/services/api';

import { AdminContact } from '@/types/AdminContact';

const AdminContactsItem: Page<{ item: AdminContact; onSave(): void }> = ({
  item,
  onSave,
}) => {
  const { modalRef } = useModal();

  const Icon = Icons[item.icon as 'Fa500Px'];

  const openEdit = useCallback(() => {
    modalRef.current?.open({
      title: `Editar ${item.type}`,
      children: (() => (
        <Formik
          initialValues={{ active: item.active, link: item.link }}
          onSubmit={async data => {
            await adminApi.put('admin/contacts', {
              id: item.id,
              active: data.active,
              link: data.link,
            });

            modalRef.current?.close();
            onSave();
          }}
        >
          {({ submitForm, setValues, values }) => (
            <>
              <div className="flex items-center mb-2">
                <strong className="font-medium mr-2">Link Ativo:</strong>
                <Toggle
                  name="active"
                  defaultValue={values.active}
                  onChange={val => {
                    setValues({ active: val, link: val ? values.link : '' });
                  }}
                />
              </div>
              {values.active && (
                <TextField
                  name="link"
                  type="url"
                  label="Link"
                  placeholder="Digite o Link..."
                />
              )}
              <Button onClick={submitForm} className="mt-4">
                Salvar
              </Button>
            </>
          )}
        </Formik>
      ))(),
    });
  }, [item, modalRef]);

  return (
    <li key={item.id}>
      <Button
        variant="outline"
        style={{ justifyContent: 'flex-start' }}
        className="pl-4 mt-2"
        onClick={openEdit}
      >
        <Icon size={24} className="mr-4" />
        <span className="normal-case">{item.type}</span>
        <span className="mx-2 text-gray3">•</span>
        <span
          className={`lowercase text-sm ${
            item.active ? 'text-green' : 'text-red'
          }`}
        >
          {item.active ? 'Ativo' : 'Inativo'}
        </span>
      </Button>
    </li>
  );
};

export default AdminContactsItem;
