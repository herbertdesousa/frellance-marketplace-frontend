import { Page } from '@/types/Page';
import { useCallback, useState } from 'react';

import { useAuth } from '@/hooks/auth';

import { api } from '@/services/api';
import { MdAdd } from 'react-icons/md';
import ProfileAccountItem from '../ProfileAccountItem';
import ProfileAccountContactsForm from './ProfileAccountContactsForm';

const contactTypes = {
  email: 'Email',
  whatsapp: 'Whatsapp',
  phone: 'Telefone',
};

export interface FormData {
  type: 'phone' | 'whatsapp' | 'email';
  contact: string;
}

const ProfileAccountContacts: Page = () => {
  const auth = useAuth();

  const refreshContacts = useCallback(async () => {
    const { data } = await api.get('/users/contacts');
    auth.refreshUser(old => ({ ...old, contacts: data }));
  }, [auth]);

  const [isEditing, setIsEditing] = useState(false);
  const onEdit = useCallback(
    async (payload: FormData, id: string) => {
      setIsEditing(true);

      await api.put('/users/contacts', payload, { params: { id } });
      await refreshContacts();

      setIsEditing(false);
    },
    [refreshContacts],
  );

  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingLoading, setIsCreatingLoading] = useState(false);
  const onCreate = useCallback(
    async (payload: FormData) => {
      setIsCreatingLoading(true);

      await api.post('/users/contacts', payload);
      await refreshContacts();

      setIsCreatingLoading(false);
      setIsCreating(false);
    },
    [refreshContacts],
  );

  const [isDeletingId, setIsDeletingId] = useState('');
  const onRemove = useCallback(
    async (id: string) => {
      setIsDeletingId(id);
      if (auth.user?.contacts && auth.user.contacts.length <= 1) return;

      await api.delete('/users/contacts', { params: { id } });
      await refreshContacts();
      setIsDeletingId('');
    },
    [auth.user?.contacts, refreshContacts],
  );

  if (!auth.user) return <></>;
  return (
    <div className="mt-10 md:max-w-sm">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-merriweather font-bold">Contatos</h2>

        <button
          type="button"
          className="flex items-center text-sm text-primary"
          onClick={() => setIsCreating(true)}
        >
          <MdAdd size={14} className="mr-1" />
          Adicionar
        </button>
      </div>

      <ul>
        {!isCreating &&
          auth.user.contacts.map((contact, index) => (
            <div key={contact.id}>
              {index > 0 && (
                <div className="w-full bg-gray1 my-4" style={{ height: 1 }} />
              )}

              <ProfileAccountItem
                label={contactTypes[contact.type] || 'Contato'}
                value={contact.contact}
                edit={{
                  buttonLabel: 'Editar',
                  editElement: ({ closeEdit }) => (
                    <ProfileAccountContactsForm
                      initialValues={{
                        type: contact.type,
                        contact: contact.contact,
                      }}
                      onSubmit={dt => {
                        onEdit(dt, contact.id);
                        closeEdit();
                      }}
                      closeEdit={closeEdit}
                      isLoading={isEditing}
                    />
                  ),
                }}
                remove={{
                  visible: (auth.user?.contacts || []).length > 1,
                  onClick: () => onRemove(contact.id),
                  buttonLabel: isDeletingId === contact.id ? '...' : 'Deletar',
                  disabled: isDeletingId === contact.id,
                }}
              />
            </div>
          ))}

        {isCreating && (
          <ProfileAccountContactsForm
            initialValues={{
              type: 'email',
              contact: '',
            }}
            onSubmit={onCreate}
            isLoading={isCreatingLoading}
            closeEdit={() => setIsCreating(false)}
          />
        )}
      </ul>
    </div>
  );
};

export default ProfileAccountContacts;
