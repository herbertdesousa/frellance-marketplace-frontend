import { Page } from '@/types/Page';

import { useField } from 'formik';
import { useCallback } from 'react';

import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

interface Props {
  name: string;
  value: string;
  label: string;
  className?: string;
  onChange?(value: string): void;
}

const Radio: Page<Props> = ({ name, value, label, className, onChange }) => {
  const [fieldProps, meta, helpers] = useField(name);

  const handleChange = useCallback(() => {
    helpers.setValue(value);
    if (onChange) onChange(value);
  }, [helpers, onChange, value]);

  return (
    <button
      type="button"
      onClick={handleChange}
      className={`flex items-center ${className}`}
    >
      <div className="text-primary mr-2">
        {fieldProps.value === value && <MdRadioButtonChecked size={24} />}
        {fieldProps.value !== value && <MdRadioButtonUnchecked size={24} />}
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default Radio;
