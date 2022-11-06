import { Page } from '@/types/Page';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useFormikContext } from 'formik';
import { v4 } from 'uuid';

import { MdAdd, MdChevronLeft, MdChevronRight, MdError } from 'react-icons/md';

import { FormData, SELL_MAX_IMAGES, SELL_MIN_IMAGES } from '@/pages/vender';
import { useModal } from '@/hooks/modal';
import { Button } from '@/components';

const SellGeneralImgs: Page = () => {
  const { values, setValues, touched, errors } = useFormikContext<FormData>();
  const { modalRef } = useModal();

  const imagesCarrouselRef = useRef<HTMLUListElement>(null);

  const onChangeFileInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target?.files) {
        const newFiles = Array.from(event.target.files).map(item => ({
          id: v4(),
          file: item,
        }));

        setValues(st => ({
          ...st,
          imgs: [...st.imgs, ...newFiles].slice(0, SELL_MAX_IMAGES),
        }));
      }
    },
    [setValues],
  );

  const removeImageUpload = useCallback(
    (id: string) => {
      setValues(st => ({
        ...st,
        imgs: st.imgs.filter(img => img.id !== id),
      }));
      modalRef.current?.close();
    },
    [modalRef, setValues],
  );

  const onClickImage = useCallback(
    (item: FormData['imgs'][0]) => {
      modalRef.current?.open({
        title: 'Imagem',
        children: (() => (
          <div>
            <div>
              <img
                src={URL.createObjectURL(item.file)}
                alt="preview"
                className="relative h-40 w-full object-cover"
              />
            </div>

            <div className="mt-4 gap-y-2">
              <Button
                className="bg-red"
                onClick={() => removeImageUpload(item.id)}
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
    },
    [modalRef, removeImageUpload],
  );

  const imgError = useMemo(() => {
    return touched.imgs && errors.imgs && String(errors.imgs);
  }, [errors.imgs, touched.imgs]);

  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const handleOnImagesCarrouselScroll = useCallback(
    (evt: React.UIEvent<HTMLUListElement, UIEvent>) => {
      setShowLeftScroll(evt.currentTarget.scrollLeft !== 0);
    },
    [],
  );
  useEffect(() => {
    setShowRightScroll(values.imgs.length > 5);
  }, [values.imgs]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <strong className="flex items-end font-medium">
          Imagens
          <p className="text-sm ml-1 text-gray3">
            {`${values.imgs.length}/${SELL_MAX_IMAGES}`}
          </p>
          <span className="text-red ml-1">*</span>
        </strong>
        <p className="text-sm ml-1 text-gray3">{`Minímo: ${SELL_MIN_IMAGES} Imagens`}</p>
      </div>

      <ul
        ref={imagesCarrouselRef}
        className="flex mt-2 overflow-y-hidden overflow-x-scroll no-scroll pr-8"
        onScroll={handleOnImagesCarrouselScroll}
      >
        {values.imgs.length !== SELL_MAX_IMAGES && (
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
              index === 0 ? '' : 'ml-1'
            }`}
            key={item.id}
            style={{ minWidth: 56, minHeight: 56 }}
          >
            <button
              type="button"
              className="h-full"
              onClick={() => onClickImage(item)}
            >
              <img
                src={URL.createObjectURL(item.file)}
                alt="preview"
                width={56}
                height={56}
                className="h-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {showRightScroll && (
        <button
          type="button"
          className="
            absolute bottom-2.5 -right-5 p-1.5 rounded-full bg-white border border-gray1
            transition hover:bg-gray0.5
          "
          onClick={() => {
            imagesCarrouselRef.current?.scrollTo({
              left: imagesCarrouselRef.current.scrollLeft + 200,
              behavior: 'smooth',
            });
          }}
        >
          <MdChevronRight size={24} />
        </button>
      )}
      {showLeftScroll && (
        <button
          type="button"
          className="
          absolute bottom-2.5 -left-5 p-1.5 rounded-full bg-white border border-gray1
          transition hover:bg-gray0.5
        "
          onClick={() => {
            imagesCarrouselRef.current?.scrollTo({
              left: imagesCarrouselRef.current.scrollLeft - 200,
              behavior: 'smooth',
            });
          }}
        >
          <MdChevronLeft size={24} />
        </button>
      )}

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
