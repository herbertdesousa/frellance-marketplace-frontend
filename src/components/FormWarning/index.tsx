import { Page } from '@/types/Page';

import { MdError } from 'react-icons/md';

interface Props {
  className?: string;
}

const FormWarning: Page<Props> = ({ className, children }) => {
  return (
    <div
      className={`
        w-full flex items-center bg-red-opaque py-2 px-4
        ${className}
      `}
    >
      <MdError size={20} className="mr-3 text-red" style={{ minWidth: 20 }} />
      <span className="font-medium text-sm">{children}</span>
    </div>
  );
};

export default FormWarning;
