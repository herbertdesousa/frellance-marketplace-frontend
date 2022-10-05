import { Page } from '@/types/Page';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { BreadCrumb } from '@/components';

const ListDetailsDescription: Page = () => {
  const router = useRouter();

  const [isDescriptionOpened, setIsDescriptionOpened] = useState(true);
  const [isGeneralOpened, setIsGeneralOpened] = useState(true);

  return (
    <div className="mt-6">
      <BreadCrumb
        data={[
          { label: 'Itens', onClick: () => router.push('/itens') },
          { label: 'Carros', onClick: () => router.push('/itens/carros') },
          { label: 'Ferrari 599' },
        ]}
      />

      <div>
        <h1 className="text-2xl font-merriweather font-bold mt-6">
          2010 Ferrari 599 rwd
        </h1>
        <h2 className="text-2xl font-merriweather font-bold">R$ 18.800,00</h2>

        <p className="mt-3 text-gray3">Penha - Minas Gerais</p>
      </div>

      <div className="w-full bg-gray1 my-8" style={{ height: 1 }} />

      <div>
        <div className="flex">
          <h3 className="font-merriweather font-bold text-lg mr-2">
            Descrição
          </h3>
          <button
            type="button"
            onClick={() => setIsDescriptionOpened(st => !st)}
          >
            <MdKeyboardArrowDown
              size={18}
              className={`text-gray3 transition ${
                isDescriptionOpened ? 'rotate-0' : 'rotate-180'
              }`}
            />
          </button>
        </div>
        {isDescriptionOpened && (
          <p className="text-gray3 mt-2">Lorem ispum dolot et</p>
        )}
      </div>

      <div className="mt-8">
        <div className="flex">
          <h3 className="font-merriweather font-bold text-lg mr-2">Gerais</h3>
          <button type="button" onClick={() => setIsGeneralOpened(st => !st)}>
            <MdKeyboardArrowDown
              size={18}
              className={`text-gray3 transition ${
                isGeneralOpened ? 'rotate-0' : 'rotate-180'
              }`}
            />
          </button>
        </div>
        {isGeneralOpened && (
          <div className="flex w-full justify-between mt-2">
            <ul>
              {['Ano', 'Quilometragem', 'Motor', 'Câmbio', 'Combústivel'].map(
                item => (
                  <li key={item} className="text-gray3">
                    {item}
                  </li>
                ),
              )}
            </ul>
            <ul className="text-right">
              {['2010', '3k KM', '12 Cilindros', 'Automático', 'Gasolina'].map(
                item => (
                  <li key={item} className="font-medium">
                    {item}
                  </li>
                ),
              )}
              {/* <strong className="font-medium">2010</strong> */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListDetailsDescription;
