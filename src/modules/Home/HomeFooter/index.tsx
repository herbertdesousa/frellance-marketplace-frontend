import { Page } from '@/types/Page';
import {
  FiHome,
  FiCreditCard,
  FiClock,
  FiAnchor,
  FiCommand,
} from 'react-icons/fi';

const categoriesData = [
  {
    id: 'id-v',
    icon: FiHome,
    label: 'Casas',
    link: '/',
  },
  {
    id: 'id-456',
    icon: FiCreditCard,
    label: 'Carros',
    link: '/',
  },
  {
    id: 'id-789',
    icon: FiClock,
    label: 'Relógios',
    link: '/',
  },
  {
    id: 'id-753',
    icon: FiAnchor,
    label: 'Iates',
    link: '/',
  },
  {
    id: 'id-159',
    icon: FiCommand,
    label: 'Helicópteros',
    link: '/',
  },
];

const HomeFooter: Page = () => {
  return (
    <footer className="w-full px-6 py-6 md:px-16 bg-black">
      <div>
        <strong className="text-gray2">Categorias</strong>
        <ul className="mt-3">
          {categoriesData.map((item, index) => (
            <li className={`${index === 0 ? '' : 'mt-1'}`}>
              <button
                type="button"
                className="flex items-center text-gray2 hover:text-white transition"
              >
                <item.icon size={16} className="mr-2" />
                {item.label}
              </button>
            </li>
          ))}
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
