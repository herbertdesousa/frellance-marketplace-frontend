import { Page } from '@/types/Page';

import { useCategories } from '@/hooks/categories';
import { useRouter } from 'next/router';
import { MdOpenInNew } from 'react-icons/md';

const HomeFooter: Page = () => {
  const categories = useCategories();
  const router = useRouter();

  return (
    <footer className="w-full px-6 py-6 md:px-16 bg-black mt-16">
      <div>
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

      <div className="w-full bg-gray3 rounded my-6" style={{ height: 1 }} />

      <div className="flex items-center">
        <div className="w-24 h-9 bg-gray3 rounded" />
        <p className="text-white ml-4 text-xs">Copyright © 2022 Enterprise</p>
      </div>
    </footer>
  );
};

export default HomeFooter;
