import { Page } from '@/types/Page';

import { MdMail, MdPhone } from 'react-icons/md';
import { Button } from '@/components';

const ListDetailsContact: Page = () => {
  return (
    <>
      <div className="block fixed md:hidden left-0 bottom-0 right-0 border-t border-gray1 p-4 bg-white z-50">
        <Button variant="filled-dark">
          <MdPhone size={24} className="mr-4" />
          COMEÇAR A VENDER
        </Button>
      </div>

      <div className="hidden md:block sticky top-6 mt-6 p-4 border border-gray0.5">
        <h1 className="font-merriweather font-bold text-2xl mb-8">
          Entrar em Contato
        </h1>

        <div className="relative">
          <div className="blur-sm text-black">
            <div className="flex">
              <MdPhone size={24} className="mr-2" />
              <p>(11) 9000-0009</p>
            </div>
            <div className="flex mt-4">
              <MdMail size={24} className="mr-2" />
              <p>email@ex.com</p>
            </div>
          </div>

          <button
            type="button"
            className="absolute top-2 flex justify-center py-2 center w-full bg-black text-white"
          >
            <MdPhone size={24} className="mr-4" />
            Entrar em contato
          </button>
        </div>
      </div>
    </>
  );
};

export default ListDetailsContact;
