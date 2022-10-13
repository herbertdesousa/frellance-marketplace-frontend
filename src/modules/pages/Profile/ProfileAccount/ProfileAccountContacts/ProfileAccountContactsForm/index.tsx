import { Page } from '@/types/Page';

import { Button, Radio, TextField } from '@/components';
import { Formik } from 'formik';
import * as Yup from 'yup';

import * as transform from '@/utils/transform';

import { FormData } from '..';

interface Props {
  closeEdit(): void;
}

const smartphoneRegex = RegExp(/\([0-9]{2}\) [0-9]{5}-[0-9]{4}/g);
const phoneRegex = RegExp(/\([0-9]{2}\) [0-9]{4}-[0-9]{4}/g);

const validationSchema = Yup.object().shape({
  type: Yup.string().oneOf(['phone', 'email', 'whatsapp'], 'inválido'),
  contact: Yup.string()
    .required('obrigatório')
    .when('type', {
      is: 'email',
      then: Yup.string().email('inválido'),
    })
    .when('type', {
      is: 'phone',
      then: Yup.string().matches(phoneRegex, 'inválido'),
    })
    .when('type', {
      is: 'whatsapp',
      then: Yup.string().matches(smartphoneRegex, 'inválido'),
    }),
});

interface Props {
  initialValues: FormData;
  onSubmit(data: FormData): void;
  closeEdit(): void;
  isLoading?: boolean;
}

const ProfileAccountContactsForm: Page<Props> = ({
  initialValues,
  onSubmit,
  closeEdit,
  isLoading,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ submitForm, setFieldValue, values }) => (
        <div className="w-full">
          <div className="mb-2">
            <Radio
              name="type"
              value="email"
              label="Email"
              onChange={() => setFieldValue('contact', '')}
            />
            <Radio
              name="type"
              value="whatsapp"
              label="WhatsApp"
              onChange={() => setFieldValue('contact', '')}
            />
            <Radio
              name="type"
              value="phone"
              label="Telefone"
              onChange={() => setFieldValue('contact', '')}
            />
          </div>

          <TextField
            name="contact"
            label="Contato"
            type={values.type === 'email' ? 'email' : 'text'}
            placeholder="Digite o contato"
            formatOnChangeText={text => {
              if (values.type === 'email') return text;
              if (values.type === 'phone') return transform.phone(text);
              return transform.smartphone(text);
            }}
          />
          <div className="flex mt-2">
            <Button className="mr-2" onClick={submitForm} disabled={isLoading}>
              {isLoading ? '...' : 'Salvar'}
            </Button>
            <Button variant="outline" onClick={closeEdit}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ProfileAccountContactsForm;
