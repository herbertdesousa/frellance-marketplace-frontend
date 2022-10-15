import { Page } from '@/types/Page';

import { IconType } from 'react-icons';
import { Button } from '..';

interface Props {
  icon: IconType;
  title: string;
  description: string;
  button?: {
    title: React.ReactNode;
    onClick?(): void;
  };
}

const EmptyState: Page<Props> = ({
  icon: Icon,
  title,
  description,
  button,
}) => {
  return (
    <div className="w-full flex flex-col items-center mx-auto max-w-xs text-center">
      <div className="p-6 border border-gray1 rounded-full">
        <Icon size={24} />
      </div>

      <h1 className="text-2xl font-merriweather font-bold mt-6">{title}</h1>
      <p className="mt-2 text-center text-gray3">{description}</p>

      {button && (
        <Button variant="filled-dark" className="mt-8" onClick={button.onClick}>
          {button.title}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
