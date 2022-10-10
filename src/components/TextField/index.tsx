import { Page } from '@/types/Page';

import { useField } from 'formik';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { MdError } from 'react-icons/md';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  placeholder: string;
  className?: string;
  formatOnChangeText?: (text: string) => string;
  right?: {
    element: React.ReactNode;
    onClick?(): void;
  };
}

const TextField: Page<Props> = ({
  name,
  label,
  placeholder,
  className,
  formatOnChangeText,
  right,
  ...props
}) => {
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
    (e: ChangeEvent<HTMLInputElement>) => {
      const evt: React.ChangeEvent<HTMLInputElement> = {
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
      <div className="flex justify-between">
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
        {isErrored && (
          <div className="flex items-center text-red">
            <MdError size={16} className="mr-1" />
            {meta.error}
          </div>
        )}
      </div>
      <div
        className={`
          h-12 p-4 flex items-center w-full mt-1 transition
          ${isFocused ? 'bg-gray1' : 'bg-gray0.5'}
        `}
      >
        <input
          id={name}
          type="text"
          className="flex flex-1 bg-transparent w-full"
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={meta.value}
          {...props}
        />
        {right && (
          <button type="button" onClick={right.onClick}>
            {right.element}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextField;
