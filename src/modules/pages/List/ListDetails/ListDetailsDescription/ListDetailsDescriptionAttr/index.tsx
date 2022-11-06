import { Page } from '@/types/Page';

import { useMemo, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { SortedAttribute } from '..';

const ListDetailsDescriptionAttr: Page<{ attrs: SortedAttribute[] }> = ({
  attrs,
}) => {
  const [isOpened, setIsOpened] = useState(true);

  const allAttrNames = useMemo(() => {
    return attrs.flatMap(item => {
      return item.attributes.map(attr => attr.name);
    });
  }, [attrs]);

  const allAttrValues = useMemo(() => {
    return attrs.flatMap(item => {
      return item.attributes.map(attr => attr.value);
    });
  }, [attrs]);

  return (
    <div className="mt-8">
      <div className="flex">
        <h3 className="font-merriweather font-bold text-lg mr-2">Detalhes</h3>
        <button type="button" onClick={() => setIsOpened(st => !st)}>
          <MdKeyboardArrowDown
            size={18}
            className={`text-gray3 transition ${
              isOpened ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </button>
      </div>
      <ul>
        {isOpened && (
          <li className="flex w-full justify-between mt-2 md:justify-start">
            <ul className="md:mr-48">
              {allAttrNames.map(attr => (
                <li key={attr} className="text-gray3">
                  {attr}
                </li>
              ))}
            </ul>
            <ul className="text-right md:text-left">
              {allAttrValues.map(attr => (
                <li key={attr} className="font-medium">
                  {attr}
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ListDetailsDescriptionAttr;
