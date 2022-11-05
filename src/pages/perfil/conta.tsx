import { Page } from '@/types/Page';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
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
import { MdCameraAlt, MdError } from 'react-icons/md';

import { User } from '@/hooks/auth/types';

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
        `users/user_notification_on_chat_messages`,
        {},
        { params: { value: value ? 1 : 0 } },
      );
      auth.refreshUser(old => ({ ...old, notificationOnChatMessages: value }));
    },
    [auth],
  );

  const [isUploadingPicture, setIsUploadingPicture] = useState(false);
  const [uploadPictureError, setUploadPictureError] = useState('');

  const uploadPicture = useCallback(
    async (evt: ChangeEvent<HTMLInputElement>) => {
      if (!evt || !evt.target.files || !evt.target.files[0]) return;

      setIsUploadingPicture(true);
      setUploadPictureError('');

      const formData = new FormData();

      formData.append('picture', evt.target.files[0]);

      try {
        const user = await api.post<User>('users/picture', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        await auth.refreshUser(old => ({ ...old, picture: user.data.picture }));
      } catch (err: any) {
        if (err.response.data.statusCode === 413)
          setUploadPictureError('Peso máximo de 2mb');
      }

      setIsUploadingPicture(false);
    },
    [auth],
  );

  if (!auth.user) return <></>;
  return (
    <>
      <Head>
        <title>Premium List - Perfil</title>
      </Head>
      <ProfileNav />

      <div className="max-width mt-10">
        <div className="flex flex-col items-center md:max-w-sm mb-8">
          <div className="relative">
            <Image
              src={auth.user.picture || '/no-picture.svg'}
              width={96}
              height={96}
              className="rounded-full"
            />
            {isUploadingPicture && (
              <div className="absolute top-0 flex items-center justify-center h-24 w-24 rounded-full z-10 bg-gray3-opaque">
                <span className="text-white text-lg">...</span>
              </div>
            )}
            <label
              htmlFor="upload"
              className="absolute cursor-pointer bottom-2 right-0 p-1.5 bg-primary text-white rounded-full z-20"
            >
              <MdCameraAlt size={16} />
              <input
                id="upload"
                type="file"
                name="picture"
                accept=".png,.jpeg,.jpg"
                disabled={isUploadingPicture}
                className="hidden"
                onChange={uploadPicture}
              />
            </label>
          </div>
          {uploadPictureError && (
            <div className="flex items-center bg-red-opaque text-red px-1 rounded mt-2">
              <MdError size={16} />
              <p className="ml-2">{uploadPictureError}</p>
            </div>
          )}
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
