import { Page } from '@/types/Page';

import { useField } from 'formik';

import * as transform from '@/utils/transform';

import { TextField, Radio } from '@/components';

const SellGeneralPrice: Page = () => {
  const [props, meta, helpers] = useField('price.value');

  return (
    <div className="mt-4">
      <h3 className="text-normal font-semibold mb-2">Preço</h3>

      <div>
        <strong className="font-medium">Tipo</strong>
        <Radio name="price.type" label="Alugar" value="alugar" />
        <Radio name="price.type" label="Vender" value="vender" />
      </div>

      <div className="mt-2">
        <strong className="font-medium">Valor</strong>
        <Radio name="price.value" label="A Combinar" value="A Combinar" />
        <Radio
          name="price.value"
          label="Fixo"
          value={props.value === 'a combinar' ? '' : props.value}
        />
        {props.value !== 'a combinar' && (
          <TextField
            name="price.value"
            label="Preço Fixo"
            placeholder="Digite o preço..."
            className="mt-1"
            formatOnChangeText={transform.money}
            isRequired
          />
        )}
      </div>
    </div>
  );
};

export default SellGeneralPrice;
