import { Page } from '@/types/Page';
import { IconType } from 'react-icons';

interface Props {
  isFirst?: boolean;
  label: string;
  Icon?: IconType;

  onClick?(): void;
}

const SideMenuItem: Page<Props> = ({ isFirst, label, Icon, onClick }) => {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`
          flex items-center py-2 px-4 bg-white w-full transition hover:bg-gray0.5
          ${isFirst ? '' : 'mt-2'}
        `}
      >
        {Icon && <Icon size={16} className="mr-4" />}
        {label}
      </button>
    </li>
  );
};

export default SideMenuItem;
