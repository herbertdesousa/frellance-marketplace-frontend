import { Page } from '@/types/Page';
import { AdminAuthProvider } from './adminAuth/provider';
import { AuthProvider } from './auth/provider';
import { CategoriesProvider } from './categories';
import { ModalProvider } from './modal';
import { SideMenuProvider } from './sideMenu';

const Hooks: Page = ({ children }) => {
  return (
    <ModalProvider>
      <CategoriesProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <SideMenuProvider>{children}</SideMenuProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </CategoriesProvider>
    </ModalProvider>
  );
};

export default Hooks;
