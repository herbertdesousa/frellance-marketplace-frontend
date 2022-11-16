import { Page } from '@/types/Page';
import Image from 'next/image';

import useSWR from 'swr';

import * as Icons from 'react-icons/fa';

import { useCategories } from '@/hooks/categories';
import { useRouter } from 'next/router';
import { MdOpenInNew } from 'react-icons/md';

import { AdminContact } from '@/types/AdminContact';
import Link from 'next/link';
import { useMemo } from 'react';
import { IconType } from 'react-icons';

type ParsedContacts = (Omit<AdminContact, 'icon'> & {
  icon: IconType;
})[];

const HomeFooter: Page = () => {
  const categories = useCategories();
  const router = useRouter();

  const { data } = useSWR<AdminContact[]>('contacts', {
    revalidateOnFocus: false,
  });

  const parsedContacts = useMemo((): ParsedContacts => {
    if (!data) return [];

    return data
      .filter(i => i.active)
      .map(item => {
        const icon = Icons[item.icon as 'Fa500Px'];
        return { ...item, icon };
      });
  }, [data]);

  return (
    <footer className="w-full px-6 py-6 md:px-16 bg-black mt-16">
      <div className="grid grid-cols-2">
        <div className="grid-span-1">
          <strong className="text-gray2">Categorias</strong>
          <ul className="mt-3">
            {categories.data.map((item, index) => (
              <li key={item.id} className={`${index === 0 ? '' : 'mt-1'}`}>
                <button
                  type="button"
                  className="flex items-center text-gray2 hover:text-white transition"
                  onClick={() => router.push(`itens/${item.slug}`)}
                >
                  <item.Icon size={16} className="mr-2" />
                  {item.name}
                </button>
              </li>
            ))}

            <li className="mt-1">
              <button
                type="button"
                className="flex items-center text-gray2 hover:text-white transition"
                onClick={() => router.push('/itens')}
              >
                <MdOpenInNew size={16} className="mr-2" />
                Mais Itens
              </button>
            </li>
          </ul>
        </div>

        <div className="grid-span-1">
          <strong className="text-gray2">Nossos Contatos</strong>
          <ul className="mt-3">
            {parsedContacts.map((item, index) => (
              <li key={item.id} className={`${index === 0 ? '' : 'mt-1'}`}>
                <Link href={item.link} target="_blank">
                  <div className="flex items-center text-gray2 hover:text-white transition cursor-pointer">
                    <item.icon size={16} className="mr-2" />
                    {item.type}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full bg-gray3 rounded my-6" style={{ height: 1 }} />

      <div className="flex items-center">
        <Image
          src="/logo/white.png"
          height={38}
          width={194}
          objectFit="cover"
        />
        <p className="text-white ml-4 text-xs">Copyright © 2022 Premium List</p>
      </div>
    </footer>
  );
};

export default HomeFooter;
