import { Page } from '@/types/Page';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';

import { ProfileNav } from '@/modules/pages/Profile';
import { Button, Footer, TextField, Toggle } from '@/components';

import {
  ProfileAccountContacts,
  ProfileAccountItem,
} from '@/modules/pages/Profile/ProfileAccount';
import { api } from '@/services/api';

const validationSchemaNameForm = Yup.object().shape({
  name: Yup.string().required('obrigatório'),
});

const Account: Page = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user && !auth.loading.state) {
      auth.authModalRef.current?.open();
      router.push('/');
    }
  }, [auth]);

  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const updateName = useCallback(
    async (name: string, exit: () => void) => {
      setIsUpdatingName(true);

      await api.patch('users/name', {}, { params: { name } });
      auth.refreshUser(old => ({ ...old, name }));

      exit();
      setIsUpdatingName(false);
    },
    [auth],
  );

  const updateNotificationOnChatMessages = useCallback(
    async (value: boolean) => {
      await api.put(
        'users/user_notification_on_chat_messages',
        {},
        { params: { value } },
      );
      auth.refreshUser(old => ({ ...old, notificationOnChatMessages: value }));
    },
    [auth],
  );

  if (!auth.user) return <></>;
  return (
    <>
      <ProfileNav />

      <div className="max-width mt-10">
        <div className="flex justify-center md:max-w-sm mb-8">
          <Image
            src={auth.user.picture || '/no-picture.svg'}
            width={96}
            height={96}
            className="rounded-full"
          />
        </div>

        <ul className="md:max-w-sm">
          <ProfileAccountItem
            label="Seu Nome"
            value={
              auth.user.name || (
                <span className="text-gray2 italic">Não preenchido</span>
              )
            }
            edit={{
              buttonLabel: 'Editar',
              editElement: ({ closeEdit }) => (
                <Formik
                  initialValues={{ name: auth.user?.name || '' }}
                  validationSchema={validationSchemaNameForm}
                  onSubmit={dt => updateName(dt.name, closeEdit)}
                >
                  {({ submitForm }) => (
                    <div className="w-full">
                      <TextField
                        name="name"
                        label="Seu Nome"
                        formatOnChangeText={text => {
                          return text.replace(/[^A-z] /g, '');
                        }}
                        placeholder="Digite seu Nome"
                        isRequired
                      />
                      <div className="flex mt-2">
                        <Button
                          className="mr-2"
                          onClick={submitForm}
                          disabled={isUpdatingName}
                        >
                          {isUpdatingName ? '...' : 'Salvar'}
                        </Button>
                        <Button variant="outline" onClick={closeEdit}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}
                </Formik>
              ),
            }}
          />

          <div className="w-full bg-gray1 my-4" style={{ height: 1 }} />

          <ProfileAccountItem label="Seu Email" value={auth.user.email} />
        </ul>

        <ProfileAccountContacts />

        {/* <div className="w-full bg-gray1 my-4" style={{ height: 1 }} /> */}
        {/* <ProfileAccountItem
          label="Sua Senha"
          value="***********"
          edit={{
            buttonLabel: 'Atualizar',
            editElement: ({ closeEdit }) => (
              <div className="w-full">
                <TextField
                  name="name"
                  label="Antiga Senha"
                  placeholder="Digite a antiga senha"
                />
                <TextField
                  name="name"
                  label="Nova Senha"
                  placeholder="Digite a nova senha"
                  className="mt-2"
                />
                <TextField
                  name="name"
                  label="Confirme a Nova Senha"
                  placeholder="Confirme a nova senha"
                  className="mt-2"
                />
                <div className="flex mt-4">
                  <Button className="mr-2">Salvar</Button>
                  <Button variant="outline" onClick={closeEdit}>
                    Cancelar
                  </Button>
                </div>
              </div>
            ),
          }}
        /> */}

        <div className="mt-10">
          <h2 className="text-2xl font-merriweather font-bold mb-8">
            Notificações
          </h2>

          <div className="flex justify-between items-start md:max-w-sm">
            <div className="flex flex-col">
              <span className="text-gray3">Mensagem</span>

              <strong className="font-medium mt-1">
                Receber notificação no email quando mensagem no chat for
                recebida.
              </strong>
            </div>

            <Toggle
              name="notify-message-from-chat"
              defaultValue={auth.user.notificationOnChatMessages}
              onChange={updateNotificationOnChatMessages}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Account;
