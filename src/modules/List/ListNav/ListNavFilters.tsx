import { Page } from '@/types/Page';

import { MdKeyboardArrowDown } from 'react-icons/md';

const ListNavFilters: Page = () => {
  return (
    <div className="w-full border-t border-b border-gray0.5">
      <ul
        className="flex overflow-y-scroll no-scroll px-6 py-2 md:px-16 mx-auto"
        style={{ maxWidth: 1440 }}
      >
        {['Ano', 'Preço', 'Quilometragem', 'Combústivel'].map((item, index) => (
          <li key={item} className={index > 0 ? 'ml-2' : ''}>
            <button
              type="button"
              className="flex items-center rounded-full border border-gray1 pl-3 py-1 pr-2 text-sm hover:bg-gray0.5 transition"
            >
              {item}
              <MdKeyboardArrowDown size={16} className="text-gray3 ml-1" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListNavFilters;
