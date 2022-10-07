import { Page } from '@/types/Page';

import { useState } from 'react';
import { MdEdit } from 'react-icons/md';

interface Props {
  label: string;
  value: string;
  className?: string;
  edit?: {
    buttonLabel?: string;
    editElement: (dt: { closeEdit(): void }) => React.ReactNode;
  };
}

const ProfileAccountItem: Page<Props> = ({ label, value, edit, className }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li
      className={`flex justify-between items-start col-span-4 lg:col-span-2 ${className}`}
    >
      {!isEditing && (
        <div className="flex flex-col w-full">
          <span className="text-gray3">{label}</span>

          <strong className="font-medium mt-1">{value}</strong>
        </div>
      )}
      {edit &&
        isEditing &&
        edit.editElement({ closeEdit: () => setIsEditing(false) })}

      {edit && !isEditing && (
        <button
          type="button"
          className="
            flex items-center pl-3 py-0.5 pr-2 text-sm border border-gray0.5 rounded-full
            transition hover:border-gray2
          "
          onClick={() => setIsEditing(true)}
        >
          <MdEdit size={16} className="mr-1 text-gray3" />
          {edit.buttonLabel}
        </button>
      )}
    </li>
  );
};

export default ProfileAccountItem;
