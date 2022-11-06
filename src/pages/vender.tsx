import { Page } from '@/types/Page';
import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';

import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';

import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { SellCategories, SellGeneral, SellNav } from '@/modules/pages/Sell';
import SellAttributes from '@/modules/pages/Sell/SellAttributes';
import { api } from '@/services/api';

export interface FormData {
  name: string;
  description: string;
  category_id: string;
  imgs: { id: string; file: File }[];
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

export const SELL_MAX_IMAGES = 20;
export const SELL_MIN_IMAGES = 5;
export const SELL_MIN_DESCRIPTION = 15;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('obrigatório'),
  description: Yup.string()
    .required('obrigatório')
    .min(SELL_MIN_DESCRIPTION, `mínimo de${SELL_MIN_DESCRIPTION}caracteres`),
  category_id: Yup.string().required('obrigatório'),
  price: Yup.object().shape({
    type: Yup.string()
      .required('obrigatório')
      .oneOf(['alugar', 'vender'], 'inválido'),
    value: Yup.string().required('obrigatório'),
  }),
  imgs: Yup.array()
    .required('obrigatório')
    .min(SELL_MIN_IMAGES, `mínimo de${SELL_MIN_IMAGES} imagens`)
    .max(SELL_MAX_IMAGES, `máximo de${SELL_MAX_IMAGES} imagens`),
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
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category_id', data.category_id);
        formData.append(
          'price',
          JSON.stringify({ type: data.price.type, value: data.price.value }),
        );
        data.imgs.map(img => {
          formData.append('imgs[]', img.file);
          return img;
        });
        data.attributes.map(attr => {
          if (attr.value) {
            formData.append(
              'attributes[]',
              JSON.stringify({ id: attr.id, value: attr.value }),
            );
          }
          return attr;
        });

        await api.post('/categories/items', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
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
      <Head>
        <title>Premium List - Vender</title>
      </Head>
      <Formik
        initialValues={{
          name: '',
          description: '',
          category_id: '',
          price: {
            type: 'vender',
            value: 'A Combinar',
          },
          imgs: [],
          attributes: [],
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
