import {
  FiHome,
  FiCreditCard,
  FiClock,
  FiAnchor,
  FiCommand,
} from 'react-icons/fi';

export function useCategories() {
  return {
    data: [
      {
        id: 'id-v',
        icon: FiHome,
        label: 'Casas',
        link: '/itens/casas',
        img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80',
      },
      {
        id: 'id-456',
        icon: FiCreditCard,
        label: 'Carros',
        link: '/itens/carros',
        img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      },
      {
        id: 'id-789',
        icon: FiClock,
        label: 'Relógios',
        link: '/itens/relogios',
        img: 'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
      },
      {
        id: 'id-753',
        icon: FiAnchor,
        label: 'Iates',
        link: '/itens/iates',
        img: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80',
      },
      {
        id: 'id-159',
        icon: FiCommand,
        label: 'Helicópteros',
        link: '/itens/helicopteros',
        img: 'https://images.unsplash.com/photo-1558597576-f1a962543f35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      },
    ],
  };
}
