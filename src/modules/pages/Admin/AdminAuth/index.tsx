import { Page } from '@/types/Page';
import { useCallback, useState } from 'react';

import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { adminApi } from '@/services/api';

import { Button, TextField } from '@/components';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface FormData {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('inválido').required('obrigatório'),
  password: Yup.string().required('obrigatório'),
});

interface Props {
  onAuthed(): void;
}

const AdminAuth: Page<Props> = ({ onAuthed }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = useCallback(
    async (dt: FormData, actions: FormikHelpers<FormData>) => {
      actions.setErrors({});

      try {
        adminApi.defaults.auth = { username: dt.email, password: dt.password };

        await adminApi.post('/admin');

        onAuthed();
      } catch (error) {
        actions.setErrors({ email: 'inválido', password: 'inválido' });
      }
    },
    [],
  );

  return (
    <div className="flex flex-col flex-1 max-w-xs px-4 mx-auto h-screen items-center justify-center">
      <h1 className="text-2xl font-merriweather font-bold mb-6 self-start">
        Entrar ADM
      </h1>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ submitForm }) => (
          <>
            <TextField
              name="email"
              type="email"
              placeholder="Digite o Email..."
              label="Email"
              className="w-full"
            />
            <TextField
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Digite a Senha..."
              label="Senha"
              className="w-full mt-2"
              right={{
                onClick: () => setIsPasswordVisible(st => !st),
                element: isPasswordVisible ? (
                  <MdVisibility />
                ) : (
                  <MdVisibilityOff />
                ),
              }}
            />

            <Button className="mt-8" onClick={submitForm}>
              Entrar
            </Button>
          </>
        )}
      </Formik>
    </div>
  );
};

export default AdminAuth;
