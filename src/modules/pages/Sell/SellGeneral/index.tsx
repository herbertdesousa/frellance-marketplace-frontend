import { Page } from '@/types/Page';

import { useFormikContext } from 'formik';

import { TextField } from '@/components';

import { FormData } from '@/pages/vender';

import SellGeneralImgs from './SellGeneralImgs';
import SellGeneralPrice from './SellGeneralPrice';

const SellGeneral: Page = () => {
  const { values } = useFormikContext<FormData>();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Gerais</h2>

      <SellGeneralImgs />

      <TextField
        name="name"
        label="Nome do Item"
        placeholder="Digite o Nome do Item..."
        className="mt-4"
        isRequired
      />
      <TextField
        name="description"
        label={(() => (
          <span className="flex items-end">
            Descrição
            <p className="text-sm ml-1 text-gray3">
              {values.description.length}
              /15
            </p>
          </span>
        ))()}
        placeholder="Detalhe o Item..."
        className="mt-4"
        isTextarea
        isRequired
      />

      <SellGeneralPrice />
    </div>
  );
};

export default SellGeneral;
