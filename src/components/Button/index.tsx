import { Page } from '@/types/Page';
import classNames from 'classnames';

import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'filled-light' | 'filled-dark';
  className?: string;
}

const Button: Page<Props> = ({
  variant = 'filled-dark',
  children,
  className,
  ...rest
}) => (
  <button
    type="button"
    className={`w-full h-12 uppercase font-medium transition flex items-center justify-center
      ${classNames({
        'border border-gray2 text-black hover:border-gray2':
          variant === 'outline',
      })}
      ${classNames({ 'bg-black text-white': variant === 'filled-dark' })}
      ${classNames({ 'bg-white text-black': variant === 'filled-light' })}
      ${className}
    `}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
