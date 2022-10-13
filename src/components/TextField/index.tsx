import { Page } from '@/types/Page';

import { Slot } from '@radix-ui/react-slot';

import { useField } from 'formik';
import {
  ChangeEvent,
  createElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { MdError } from 'react-icons/md';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  name: string;
  placeholder: string;
  className?: string;
  formatOnChangeText?: (text: string) => string;
  right?: {
    element: React.ReactNode;
    onClick?(): void;
  };
  isTextarea?: boolean;
  isRequired?: boolean;
  helperText?: string;
}

const TextField: Page<Props> = ({
  name,
  label,
  placeholder,
  className,
  formatOnChangeText,
  right,
  isTextarea,
  helperText,
  isRequired,
  ...props
}) => {
  const InputComponent: any = isTextarea ? 'textarea' : 'input';

  const [fieldProps, meta, helpers] = useField(name);

  const [isFocused, setIsFocused] = useState(false);

  const isErrored = useMemo(
    (): boolean => meta.touched && !!meta.error,
    [meta.error, meta.touched],
  );

  const onFocus = useCallback(
    (e: any) => {
      setIsFocused(true);
      if (props.onFocus) props.onFocus(e);
    },
    [props?.onFocus],
  );
  const onBlur = useCallback(
    (e: any) => {
      setIsFocused(false);
      if (props.onBlur) props.onBlur(e);
    },
    [props?.onBlur],
  );
  const onChange = useCallback(
    (e: ChangeEvent<any>) => {
      const evt: React.ChangeEvent<any> = {
        ...e,
        target: {
          ...e.target,
          value: formatOnChangeText
            ? formatOnChangeText(e.target.value)
            : e.target.value,
        },
      };

      fieldProps.onChange(name)(evt);
      if (props.onChange) props.onChange(evt);
    },
    [fieldProps, formatOnChangeText, name, props],
  );

  return (
    <div className={className}>
      <label htmlFor={name} className="flex font-medium">
        {label}
        {isRequired && <span className="text-red ml-1">*</span>}
      </label>
      <div
        className={`
          px-4 py-2 flex items-center w-full mt-1 transition
          ${isFocused ? 'bg-gray1' : 'bg-gray0.5'}
        `}
        style={{ minHeight: 48 }}
      >
        <InputComponent
          id={name}
          type="text"
          className="flex flex-1 bg-transparent w-full resize-none"
          placeholder={placeholder}
          cols={30}
          rows={4}
          onFocus={onFocus as any}
          onBlur={onBlur as any}
          onChange={onChange as any}
          value={meta.value}
          {...props}
        />
        {right && (
          <button type="button" onClick={right.onClick}>
            {right.element}
          </button>
        )}
      </div>
      {helperText && <p className="text-xs mt-1">{`* ${helperText}`}</p>}
      {isErrored && (
        <div className="flex items-center text-red mt-1">
          <MdError size={16} className="mr-1" />
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default TextField;
