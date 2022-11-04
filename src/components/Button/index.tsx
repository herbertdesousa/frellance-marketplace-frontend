import { Page } from '@/types/Page';
import classNames from 'classnames';

import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'filled-light' | 'filled-dark';
  size?: 'normal' | 'sm';
  className?: string;
}

const Button: Page<Props> = ({
  variant = 'filled-dark',
  size = 'normal',
  children,
  className,
  ...rest
}) => (
  <button
    type="button"
    className={`w-full  uppercase font-medium transition flex items-center justify-center
      ${classNames({
        'border border-gray2 text-black hover:border-gray3':
          variant === 'outline',
      })}
      ${classNames({ 'bg-black text-white': variant === 'filled-dark' })}
      ${classNames({ 'bg-white text-black': variant === 'filled-light' })}
      ${classNames({ 'h-12': size === 'normal' })}
      ${classNames({ 'py-2 text-sm px-2': size === 'sm' })}
      ${className}
    `}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
