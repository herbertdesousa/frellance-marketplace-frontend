import { Page } from '@/types/Page';

import { useMemo, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

const ListDetailsDescriptionBlock: Page<{ description: string }> = ({
  description,
}) => {
  const [isOpened, setIsOpened] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const descriptionFormatted = useMemo(() => {
    if (!isExpanded) return description.slice(0, 200);
    return description;
  }, [description, isExpanded]);

  return (
    <div>
      <div className="flex">
        <h3 className="font-merriweather font-bold text-lg mr-2">Descrição</h3>
        <button type="button" onClick={() => setIsOpened(st => !st)}>
          <MdKeyboardArrowDown
            size={18}
            className={`text-gray3 transition ${
              isOpened ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </button>
      </div>
      {isOpened && (
        <div
          className="flex flex-col relative truncate overflow-hidden"
          style={{ maxHeight: !isExpanded ? 100 : '100%' }}
        >
          <p className="text-gray3 mt-2 whitespace-pre-wrap truncate">
            {description}
          </p>

          <button
            type="button"
            className={`
              underline text-primary
              ${isExpanded ? 'self-end' : 'absolute bottom-0 right-0 pl-8 pr-4'}

            `}
            style={{
              background: 'linear-gradient(90deg, rgba(0, 0, 0, 0), white 15%)',
            }}
            onClick={() => setIsExpanded(st => !st)}
          >
            {isExpanded ? 'Ler Menos' : 'Ler Mais'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ListDetailsDescriptionBlock;
