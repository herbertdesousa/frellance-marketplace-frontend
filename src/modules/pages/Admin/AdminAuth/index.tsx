import { Page } from '@/types/Page';
import { useCallback, useState } from 'react';

import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { Button, TextField } from '@/components';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useAdminAuth } from '@/hooks/adminAuth';

interface FormData {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('inválido').required('obrigatório'),
  password: Yup.string().required('obrigatório'),
});

const AdminAuth: Page = () => {
  const { auth } = useAdminAuth();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = useCallback(
    async (dt: FormData, actions: FormikHelpers<FormData>) => {
      actions.setErrors({});

      try {
        await auth(dt);
      } catch (error) {
        actions.setErrors({ email: 'inválido', password: 'inválido' });
      }
    },
    [auth],
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
