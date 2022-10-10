import { Page } from '@/types/Page';

import { useCallback, useState } from 'react';
import Image from 'next/image';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import firebaseConfig from '@/config/firebase-config';

import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/hooks/auth';

import { Button, FormWarning, Modal, TextField } from '@/components';
import { firebaseAuthErrors } from '@/utils/firebaseAuthErrors';

interface AuthFormData {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('inválido').required('obrigatório'),
  password: Yup.string().min(6, 'min de 6 caracteres'),
});

type FormType = 'sign-in' | 'sign-up';

const AuthModal: Page = () => {
  const { authModalRef, auth, loading } = useAuth();

  const [formType, setFormType] = useState<FormType>('sign-in');
  const changeFormType = (_formType: FormType) => {
    setFormType(_formType);
    setErrorMessage('');
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = useCallback(
    async (data: AuthFormData) => {
      loading.set(true);
      setErrorMessage('');

      try {
        if (formType === 'sign-in') {
          const result = await signInWithEmailAndPassword(
            firebaseConfig.auth,
            data.email,
            data.password,
          );
          result.user.getIdToken().then(token => auth(token));
        } else {
          const result = await createUserWithEmailAndPassword(
            firebaseConfig.auth,
            data.email,
            data.password,
          );
          result.user.getIdToken().then(token => auth(token));
        }

        authModalRef.current?.close();
      } catch (err: any) {
        setErrorMessage(firebaseAuthErrors[err.code as 'auth/app-deleted']);
      } finally {
        loading.set(false);
      }
    },
    [auth, authModalRef, formType, loading],
  );

  const signInWithGoogle = useCallback(async () => {
    loading.set(true);
    setErrorMessage('');

    try {
      const result = await signInWithPopup(
        firebaseConfig.auth,
        firebaseConfig.provider,
      );

      result.user.getIdToken().then(token => auth(token));

      authModalRef.current?.close();
    } catch (err: any) {
      setErrorMessage(firebaseAuthErrors[err.code as 'auth/app-deleted']);
    } finally {
      loading.set(false);
    }
  }, [auth, authModalRef, loading]);

  return (
    <Modal
      ref={authModalRef}
      title={formType === 'sign-in' ? 'Entrar' : 'Criar Conta'}
    >
      <button
        type="button"
        className="w-full uppercase font-medium flex items-center border border-gray0.5 px-4 py-2"
        onClick={signInWithGoogle}
      >
        <Image src="/icon-google.svg" width={32} height={32} />

        <span className="ml-4 text-sm whitespace-nowrap md:text-base">
          Continuar com google
        </span>
      </button>

      <div className="flex items-center w-full my-4">
        <div className="flex flex-1 bg-gray1 my-4" style={{ height: 1 }} />
        <span className="mx-4">ou</span>
        <div className="flex flex-1 bg-gray1 my-4" style={{ height: 1 }} />
      </div>

      {errorMessage && (
        <FormWarning className="mb-4">{errorMessage}</FormWarning>
      )}

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ submitForm }) => (
          <>
            <TextField
              name="email"
              type="email"
              label="Seu Email"
              placeholder="Digite seu Email..."
            />
            <TextField
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              label="Sua Senha"
              placeholder="Digite sua Senha..."
              right={{
                element: isPasswordVisible ? (
                  <MdVisibilityOff />
                ) : (
                  <MdVisibility />
                ),
                onClick: () => setIsPasswordVisible(st => !st),
              }}
              className="mt-4"
            />

            <Button
              className="mt-4"
              onClick={submitForm}
              disabled={loading.state}
            >
              {!loading.state ? 'Entrar' : '...'}
            </Button>
          </>
        )}
      </Formik>

      <div className="flex flex-1 bg-gray1 my-6" style={{ height: 1 }} />

      {formType === 'sign-in' && (
        <p className="text-center">
          Não possui conta?&nbsp;
          <button
            className="underline"
            type="button"
            onClick={() => changeFormType('sign-up')}
          >
            Criar Conta
          </button>
        </p>
      )}
      {formType === 'sign-up' && (
        <p className="text-center">
          Já tem uma conta?&nbsp;
          <button
            className="underline"
            type="button"
            onClick={() => changeFormType('sign-in')}
          >
            Entrar
          </button>
        </p>
      )}
    </Modal>
  );
};

export default AuthModal;
