import { Page } from '@/types/Page';
import { MdChevronRight } from 'react-icons/md';

interface Item {
  label: string;
  onClick?(): void;
}

const BreadCrumb: Page<{ data: Item[] }> = ({ data }) => {
  return (
    <ul className="flex">
      {data.map((item, index, arr) => (
        <li key={item.label} className="flex items-center">
          {index !== 0 && (
            <MdChevronRight size={16} className="mx-2 text-gray2" />
          )}
          <button
            type="button"
            onClick={item.onClick}
            className={`
            transition
              ${
                index === arr.length - 1
                  ? 'font-semibold text-black'
                  : 'font-normal text-gray2 hover:text-gray3'
              }
            `}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BreadCrumb;
