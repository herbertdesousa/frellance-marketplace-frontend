import { Page } from '@/types/Page';
import { ChangeEvent, useCallback, useMemo } from 'react';

import { useFormikContext } from 'formik';
import { v4 } from 'uuid';

import { MdAdd, MdError } from 'react-icons/md';

import { FormData } from '@/pages/vender';
import { useModal } from '@/hooks/modal';
import { Button } from '@/components';

const SellGeneralImgs: Page = () => {
  const { values, setErrors, setValues, touched, errors } =
    useFormikContext<FormData>();
  const { modalRef } = useModal();

  const onChangeFileInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target?.files) {
        const newFiles = Array.from(event.target.files).map(item => ({
          name: v4(),
          size: item.size,
          url: URL.createObjectURL(item),
          file: item,
        }));

        if (newFiles.find(item => item.size > 1e6)) {
          setErrors({ imgs: 'somente imagens com até 5mb' });
          return;
        }

        setValues(st => ({
          ...st,
          imgs: [...st.imgs, ...newFiles].slice(0, 5),
        }));
      }
    },
    [setErrors, setValues],
  );

  const removeImageUpload = useCallback(
    (name: string) => {
      setValues(st => ({
        ...st,
        imgs: st.imgs.filter(img => img.name !== name),
      }));
      modalRef.current?.close();
    },
    [modalRef, setValues],
  );

  const imgError = useMemo(() => {
    return touched.imgs && errors.imgs && String(errors.imgs);
  }, [errors.imgs, touched.imgs]);

  return (
    <div>
      <strong className="flex items-end font-medium">
        Imagens
        <p className="text-sm ml-1 text-gray3">
          {values.imgs.length}
          /5
        </p>
        <span className="text-red ml-1">*</span>
      </strong>

      <ul className="flex mt-2 overflow-x-scroll no-scroll">
        {values.imgs.length !== 5 && (
          <li
            className="
              h-14 w-14 border border-dashed border-gray2 hover:border-gray3 transition
              flex items-center justify-center mr-2 relative
            "
            style={{ minWidth: 56, minHeight: 56 }}
          >
            <label htmlFor="img-1" className="cursor-pointer">
              <MdAdd size={24} className="text-primary" />
              <input
                id="img-1"
                type="file"
                className="absolute invisible"
                multiple
                accept="image/*"
                onChange={onChangeFileInput}
              />
            </label>
          </li>
        )}

        {values.imgs.map((item, index) => (
          <li
            className={`h-14 w-14 border border-gray1 ${
              index === 0 ? '' : 'ml-2'
            }`}
            key={item.name}
            style={{ minWidth: 56, minHeight: 56 }}
          >
            <button
              type="button"
              className="h-full"
              onClick={() => {
                modalRef.current?.open({
                  title: 'Imagem',
                  children: (() => (
                    <div>
                      <img
                        src={item.url}
                        alt="preview"
                        className="w-full h-40 object-cover"
                      />

                      <div className="mt-4 gap-y-2">
                        <Button
                          className="bg-red"
                          onClick={() => removeImageUpload(item.name)}
                        >
                          Remover Imagem
                        </Button>
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() => modalRef.current?.close()}
                        >
                          Fechar
                        </Button>
                      </div>
                    </div>
                  ))(),
                });
              }}
            >
              <img
                src={item.url}
                alt="preview"
                className="h-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {imgError && (
        <div className="flex items-center text-red mt-1">
          <MdError size={16} className="mr-1" />
          {imgError}
        </div>
      )}
    </div>
  );
};

export default SellGeneralImgs;
