import { Page } from '@/types/Page';
import { useCallback, useEffect, useState } from 'react';

import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

interface Props {
  id: string;
  iconSize?: 16 | 24;
  className?: string;
  containerClassName?: string;
}

const FavButton: Page<Props> = ({
  id,
  iconSize = 16,
  className,
  containerClassName,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

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

  const onClick = useCallback(() => {
    setIsFavorited(st => {
      if (st) return false;

      setSeconds(2);
      return true;
    });
  }, []);

  const isAddAnimationRunning = isFavorited && seconds !== 0;

  return (
    <button
      type="button"
      className={`absolute z-40 transition top-2 ${className}`}
      style={{
        transform: `translate(${isAddAnimationRunning ? '-70px' : '0px'}, 0)`,
        right: 28 + 8,
      }}
      onClick={onClick}
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
