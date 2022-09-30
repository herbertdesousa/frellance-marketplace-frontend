import { Page } from '@/types/Page';

const Grid: Page<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className, style }) => {
  return (
    <div
      style={{ maxWidth: 1440, ...style }}
      className={`grid
        grid-cols-4 gap-x-4
        md:grid-cols-8 md:gap-x-6
        lg:grid-cols-12 lg:gap-x-8
        w-full mx-auto
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Grid;
