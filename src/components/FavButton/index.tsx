import { Page } from '@/types/Page';
import { useCallback, useEffect, useState } from 'react';

import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

const FavButton: Page<{ id: string }> = ({ id }) => {
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
    <div className="absolute -top-2" style={{ right: 28 + 8 }}>
      <button
        type="button"
        className="relative z-40 transition"
        style={{
          transform: `translate(${isAddAnimationRunning ? '-70px' : '0px'}, 0)`,
        }}
        onClick={onClick}
      >
        <div
          className={`absolute bg-white transition ${
            isAddAnimationRunning ? 'rounded-sm' : 'rounded-full'
          }`}
          style={{
            width: 28,
            height: 28,
            transform: `scale(${isAddAnimationRunning ? '3.5' : '1'}, 1)`,
            transformOrigin: '0% 100%',
          }}
        />

        <div className="absolute top-1.5 left-1.5 z-20">
          <div className="flex">
            {!isFavorited && <MdFavoriteBorder size={16} />}
            {isFavorited && <MdFavorite size={16} />}
            <span
              className={`
                text-xs ml-2 transition
                ${
                  isAddAnimationRunning
                    ? 'opacity-100 delay-75 duration-200'
                    : 'opacity-0 duration-75'
                }
              `}
            >
              Adicionado
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default FavButton;
