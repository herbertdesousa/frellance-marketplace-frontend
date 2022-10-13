import { Page } from '@/types/Page';
import { AuthProvider } from './auth/provider';
import { CategoriesProvider } from './categories';
import { ModalProvider } from './modal';
import { SideMenuProvider } from './sideMenu';

const Hooks: Page = ({ children }) => {
  return (
    <ModalProvider>
      <CategoriesProvider>
        <AuthProvider>
          <SideMenuProvider>{children}</SideMenuProvider>
        </AuthProvider>
      </CategoriesProvider>
    </ModalProvider>
  );
};

export default Hooks;
