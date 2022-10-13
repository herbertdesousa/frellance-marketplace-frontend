import { Page } from '@/types/Page';
import { AuthProvider } from './auth/provider';
import { CategoriesProvider } from './categories';
import { SideMenuProvider } from './sideMenu';

const Hooks: Page = ({ children }) => {
  return (
    <CategoriesProvider data={[]}>
      <AuthProvider>
        <SideMenuProvider>{children}</SideMenuProvider>
      </AuthProvider>
    </CategoriesProvider>
  );
};

export default Hooks;
