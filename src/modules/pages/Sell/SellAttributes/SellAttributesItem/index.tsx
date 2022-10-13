import { Page } from '@/types/Page';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { SortedAttribute } from '..';
import SellAttributesItemAttr from './SellAttributesItemAttr';

const SellAttributesItem: Page<SortedAttribute> = ({
  attributes,
  class: cls,
}) => {
  const [isClosed, setIsClosed] = useState(false);

  const [isEditingId, setIsEditingId] = useState('');

  return (
    <li className="mb-4">
      <div className="pb-2 border-b border-gray1 mb-2">
        <div className="flex items-center">
          <h3 className="font-semibold">{cls}</h3>
          <button
            type="button"
            className={`ml-1 text-gray3 transform transition ${
              isClosed ? 'rotate-180' : 'rotate-0'
            }`}
            onClick={() => setIsClosed(st => !st)}
          >
            <MdKeyboardArrowDown size={18} />
          </button>
        </div>
      </div>

      {!isClosed && (
        <ul>
          {attributes.map(attr => (
            <SellAttributesItemAttr
              key={attr.attributes_id}
              isEditingId={{ state: isEditingId, set: setIsEditingId }}
              attr={attr}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SellAttributesItem;
