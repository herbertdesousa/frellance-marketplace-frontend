import { api } from '@/services/api';
import { Page } from '@/types/Page';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

interface Props {
  itemId: string;
  iconSize?: 16 | 24;
  className?: string;
  containerClassName?: string;
  defaultValue?: boolean;
}

const FavButton: Page<Props> = ({
  itemId,
  iconSize = 16,
  className,
  containerClassName,
  defaultValue = false,
}) => {
  const [isFavorited, setIsFavorited] = useState(defaultValue);

  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        //
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();

    api
      .get('/categories/items/favorited', {
        params: { id: itemId },
      })
      .then(response => {
        if (unmounted) setIsFavorited(response.data.value);
      });

    return () => {
      unmounted = true;
      source.cancel('Cancelling in cleanup');
    };
  }, [itemId]);

  const onFavorited = useCallback(async () => {
    await api.post(
      '/users/preferences',
      {},
      {
        params: { type: 'favorites', itemId },
      },
    );
    setIsFavorited(true);
  }, [itemId]);

  const onUnfavorited = useCallback(async () => {
    await api.delete('/users/preferences', {
      params: { type: 'favorites', itemId },
    });
    setIsFavorited(false);
  }, [itemId]);

  const handleOnClick = useCallback(() => {
    const newFavorited = !isFavorited;
    if (!newFavorited) {
      onUnfavorited();
    } else {
      onFavorited();
      setSeconds(2);
    }
  }, [isFavorited]);

  const isAddAnimationRunning = isFavorited && seconds !== 0;
  return (
    <button
      type="button"
      className={`absolute z-40 transition top-2 ${className}`}
      style={{
        transform: `translate(${isAddAnimationRunning ? '-70px' : '0px'}, 0)`,
        right: 28 + 8,
      }}
      onClick={handleOnClick}
    >
      <div
        className={`absolute bg-white transition ${containerClassName}  ${
          isAddAnimationRunning ? 'rounded-sm' : 'rounded-full'
        }`}
        style={{
          width: 6 + iconSize + 6,
          height: 6 + iconSize + 6,
          transform: `scale(${
            // eslint-disable-next-line no-nested-ternary
            isAddAnimationRunning ? (iconSize === 16 ? '3.5' : '3') : '1'
          }, 1)`,
          transformOrigin: '0% 100%',
        }}
      />

      <div className="absolute top-1.5 left-1.5 z-20">
        <div className="flex items-center">
          {!isFavorited && <MdFavoriteBorder size={iconSize} />}
          {isFavorited && <MdFavorite size={iconSize} className="text-red" />}
          <span
            className={`
                text-xs ml-2 transition
                ${
                  isAddAnimationRunning
                    ? 'block opacity-100 delay-75 duration-200'
                    : 'hidden opacity-0 duration-75'
                }
              `}
          >
            Adicionado
          </span>
        </div>
      </div>
    </button>
  );
};

export default FavButton;
