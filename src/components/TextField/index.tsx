import { Page } from '@/types/Page';

interface Props {
  label: string;
  name: string;
  placeholder: string;
  className?: string;
}

const TextField: Page<Props> = ({ name, label, placeholder, className }) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <div className="h-12 p-4 flex bg-gray0.5 w-full mt-1">
        <input
          id={name}
          type="text"
          className="flex flex-1 bg-transparent w-full"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TextField;
