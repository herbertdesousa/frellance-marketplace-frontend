import { Page } from '@/types/Page';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { FavButton } from '@/components';

import style from './ListItem.module.css';

interface Props {
  className?: string;
  item: {
    id: string;
    img: string;
    price: string;
    description: string;
  };
  isFavorited?: boolean;
  imgMeasureType?: 'square' | 'fill';
}

const ListItem: Page<Props> = ({
  className,
  item,
  isFavorited = false,
  imgMeasureType = 'fill',
}) => {
  const router = useRouter();

  return (
    <li className={`relative mb-6 ${className}`}>
      <button
        type="button"
        className="relative w-full text-left hover:underline"
        onClick={() => router.push(`/itens/detalhes/${item.id}`)}
      >
        <div
          className={`relative ${
            imgMeasureType === 'square' ? style['item-measures'] : 'h-52 w-full'
          }`}
        >
          <Image
            src={item.img}
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
        </div>

        <div className={`mt-3 ${style['item-width-measures']}`}>
          <strong>{item.price}</strong>
          <p className="text-gray3 whitespace-nowrap overflow-hidden truncate">
            {item.description}
          </p>
        </div>
      </button>

      <FavButton defaultValue={isFavorited} itemId={item.id} />
    </li>
  );
};

export default ListItem;
