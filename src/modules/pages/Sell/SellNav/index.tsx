import { Button } from '@/components';
import { Page } from '@/types/Page';

import { useFormikContext } from 'formik';

import { useRouter } from 'next/router';

import { MdClose } from 'react-icons/md';

interface Props {
  isScrolled?: boolean;
  isSubmitActive?: boolean;
  isSubmitting?: boolean;
}
const SellNav: Page<Props> = ({ isScrolled, isSubmitActive, isSubmitting }) => {
  const router = useRouter();
  const { submitForm } = useFormikContext();

  return (
    <nav
      className={`
        flex items-center justify-between p-6 bg-white border-b
        top-0 fixed left-0 right-0 z-20 ${
          isScrolled ? 'border-gray1' : 'border-white'
        }
      `}
    >
      <div className="flex items-center">
        <button
          type="button"
          className="flex items-center text-gray3 transition hover:text-black mr-4"
          onClick={router.back}
        >
          <MdClose size={18} className="" />
        </button>

        <h1 className="text-2xl font-merriweather font-bold">Vender</h1>
      </div>

      <Button
        className={`text-xs px-4 w-auto ${
          isSubmitActive ? 'bg-black' : 'bg-gray2'
        }`}
        size="sm"
        onClick={submitForm}
        disabled={!isSubmitActive}
      >
        {isSubmitting ? 'Anuciando...' : 'Anunciar'}
      </Button>
    </nav>
  );
};

export default SellNav;
