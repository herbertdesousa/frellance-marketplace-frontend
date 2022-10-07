import { Page } from '@/types/Page';

import style from './Toggle.module.css';

interface Props {
  name: string;
}

const Toggle: Page<Props> = ({ name }) => {
  return (
    <label htmlFor={name} className={style.switch}>
      <input id={name} type="checkbox" />
      <span className={style.slider} />
    </label>
  );
};

export default Toggle;
