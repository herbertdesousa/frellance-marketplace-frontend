import { Page } from '@/types/Page';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@/components';
import { ItemSelect } from '../..';

interface Props {
  item: ItemSelect;
  onClickAction(action: 'add' | 'remove'): void;
}

const AdminDashHeroItem: Page<Props> = ({ item, onClickAction }) => {
  const router = useRouter();

  return (
    <li
      className={`
        md:flex md:items-center
        mt-2 p-2 rounded border border-dashed text-left w-full
        ${
          item.selectedOnHome
            ? 'border-primary bg-primary-opaque'
            : 'border-gray2'
        }
      `}
    >
      <div className="relative h-24 w-full md:h-16 md:w-16">
        <Image src={item.img} layout="fill" objectFit="cover" />
      </div>

      <div className="flex flex-col mt-2 md:mt-0 md:flex-row md:items-center md:w-full">
        <div className="truncate ml-2  flex flex-col flex-1">
          <strong className="whitespace-nowrap truncate">{item.name}</strong>
          <p className="whitespace-nowrap truncate">{item.description}</p>
        </div>

        <div className="flex flex-col mt-2 md:mt-0">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              router.push(`/itens/detalhes/${item.id}`);
            }}
          >
            Ver Anuncio
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="mt-1"
            onClick={() => {
              onClickAction(item.selectedOnHome ? 'remove' : 'add');
            }}
          >
            {item.selectedOnHome ? 'Remover da Home' : 'Adicionar a Home'}
          </Button>
        </div>
      </div>
    </li>
  );
};

export default AdminDashHeroItem;
