import { Page } from '@/types/Page';

import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'filled';
  className?: string;
}

const Button: Page<Props> = ({
  variant = 'filled',
  children,
  className,
  ...rest
}) => (
  <button
    type="button"
    className={`w-full h-12 uppercase font-medium transition ${
      variant === 'outline'
        ? 'border border-gray1 text-black hover:border-gray2'
        : 'bg-black text-white'
    } ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
