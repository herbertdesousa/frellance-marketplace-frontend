import { Page } from '@/types/Page';

import { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

interface Props {
  label: string;
  value: React.ReactNode;
  className?: string;
  edit?: {
    buttonLabel?: string;
    editElement: (dt: { closeEdit(): void }) => React.ReactNode;
  };
  remove?: {
    visible?: boolean;
    buttonLabel?: string;
    onClick?(): void;
    disabled?: boolean;
  };
}

const ProfileAccountItem: Page<Props> = ({
  label,
  value,
  edit,
  remove,
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li
      className={`flex justify-between items-start col-span-4 lg:col-span-2 ${className}`}
    >
      {!isEditing && (
        <div className="flex flex-col w-full truncate">
          <span className="text-gray3">{label}</span>

          <strong className="font-medium mt-1 truncate">{value}</strong>
        </div>
      )}
      {edit &&
        isEditing &&
        edit.editElement({ closeEdit: () => setIsEditing(false) })}

      {!isEditing && (
        <div className="flex flex-col items-end ml-2">
          {edit && (
            <button
              type="button"
              className="
                flex items-center pl-3 py-0.5 pr-2 text-sm border border-gray0.5 rounded-full
                transition hover:border-gray2 mb-1
              "
              onClick={() => setIsEditing(true)}
            >
              <MdEdit size={16} className="mr-1 text-gray3" />
              {edit.buttonLabel}
            </button>
          )}
          {remove && remove.visible && (
            <button
              type="button"
              className="
                flex items-center pl-3 py-0.5 pr-2 text-sm border border-gray0.5 rounded-full
                transition hover:border-gray2
              "
              disabled={remove.disabled}
              onClick={remove.onClick}
            >
              <MdDelete size={16} className="mr-1 text-gray3" />
              {remove.buttonLabel}
            </button>
          )}
        </div>
      )}
    </li>
  );
};

export default ProfileAccountItem;
