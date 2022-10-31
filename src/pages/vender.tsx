import { Page } from '@/types/Page';
import { useCallback, useEffect, useState } from 'react';

import * as firebaseStorage from 'firebase/storage';
import firebaseConfig from '@/config/firebase-config';

import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';

import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { SellCategories, SellGeneral, SellNav } from '@/modules/pages/Sell';
import SellAttributes from '@/modules/pages/Sell/SellAttributes';
import { api } from '@/services/api';

interface FormDataImage {
  name: string;
  url: string;
  file: File;
}

export interface FormData {
  name: string;
  description: string;
  category_id: string;
  imgs: FormDataImage[];
  price: {
    type: 'alugar' | 'vender';
    value: string;
  };
  attributes: {
    id: string;
    value: string;
    required: boolean;
  }[];
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('obrigatório'),
  description: Yup.string()
    .required('obrigatório')
    .min(15, 'mínimo de 15 caracteres'),
  category_id: Yup.string().required('obrigatório'),
  price: Yup.object().shape({
    type: Yup.string()
      .required('obrigatório')
      .oneOf(['alugar', 'vender'], 'inválido'),
    value: Yup.string().required('obrigatório'),
  }),
  imgs: Yup.array()
    .required('obrigatório')
    .min(5, 'necessário 5 imagens')
    .max(5, 'necessário 5 imagens'),
  attributes: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required('obrigatório'),
        value: Yup.string().when('required', {
          is: true,
          then: Yup.string().required('obrigatório'),
        }),
        required: Yup.boolean(),
      }),
    )
    .required('obrigatório'),
});

const Account: Page = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user && !auth.loading.state) {
      auth.authModalRef.current?.open({
        onClickClose() {
          router.push('/');
        },
      });
    }
  }, [auth]);

  const onSubmit = useCallback(
    async (data: FormData, actions: FormikHelpers<FormData>) => {
      try {
        const imgs = await Promise.all(
          data.imgs.map(async item => {
            const imageRef = firebaseStorage.ref(
              firebaseConfig.storage,
              `items/${item.name}`,
            );

            const snapshot = await firebaseStorage.uploadBytes(
              imageRef,
              item.file,
            );
            return {
              url: await firebaseStorage.getDownloadURL(snapshot.ref),
              name: item.name,
            };
          }),
        );

        await api.post('/categories/items', {
          ...data,
          attributes: data.attributes.filter(item => item.value),
          imgs,
        });

        router.push('/perfil/anuncios');
        actions.setSubmitting(false);
      } catch (err) {
        console.log(err);
      }
    },
    [router],
  );

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (!auth.user) return <></>;
  return (
    <div className="relative max-width mt-10">
      <Formik
        initialValues={{
          name: '',
          description: '',
          category_id: '',
          price: {
            type: 'vender',
            value: 'A Combinar',
          },
          imgs: [] as FormDataImage[],
          attributes: [] as FormData['attributes'],
        }}
        initialErrors={{
          name: '',
          description: '',
          category_id: '',
          imgs: '',
          attributes: '',
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, isSubmitting }) => (
          <>
            <SellNav
              isScrolled={scrollPosition > 0}
              isSubmitActive={Object.keys(errors).length === 0 || isSubmitting}
              isSubmitting={isSubmitting}
            />

            <div className="md:max-w-sm pb-16 mt-24">
              <div className="mt-8">
                <SellGeneral />
                <SellCategories />
                <SellAttributes />
              </div>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Account;
