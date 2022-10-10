import { Page } from '@/types/Page';
import { useCallback, useState } from 'react';

import style from './Toggle.module.css';

interface Props {
  name: string;
  onChange?: (value: boolean) => void;
  defaultValue?: boolean;
}

const Toggle: Page<Props> = ({ name, onChange, defaultValue = false }) => {
  const [isChecked, setIsChecked] = useState(defaultValue);

  const handleChange = useCallback(() => {
    const newValue = !isChecked;

    if (onChange) onChange(newValue);
    setIsChecked(newValue);
  }, [isChecked, onChange]);

  return (
    <label htmlFor={name} className={style.switch}>
      <input
        id={name}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <span className={style.slider} />
    </label>
  );
};

export default Toggle;
