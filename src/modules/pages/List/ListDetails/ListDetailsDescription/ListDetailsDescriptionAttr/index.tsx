import { Page } from '@/types/Page';

import { useMemo, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { SortedAttribute } from '..';

const ListDetailsDescriptionAttr: Page<{ item: SortedAttribute }> = ({
  item,
}) => {
  const [isOpened, setIsOpened] = useState(true);

  const allAttrNames = useMemo(() => {
    return item.attributes.map(attr => attr.name);
  }, [item.attributes]);

  const allAttrValues = useMemo(() => {
    return item.attributes.map(attr => attr.value);
  }, [item.attributes]);

  return (
    <li className="mt-8">
      <div className="flex">
        <h3 className="font-merriweather font-bold text-lg mr-2">
          {item.class}
        </h3>
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
        <div className="flex w-full justify-between mt-2">
          <ul>
            {allAttrNames.map(attr => (
              <li key={attr} className="text-gray3">
                {attr}
              </li>
            ))}
          </ul>
          <ul className="text-right">
            {allAttrValues.map(attr => (
              <li key={attr} className="font-medium">
                {attr}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default ListDetailsDescriptionAttr;
