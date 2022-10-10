import { Page } from '@/types/Page';
import { AuthProvider } from './auth/provider';
import { SideMenuProvider } from './sideMenu';

const Hooks: Page = ({ children }) => {
  return (
    <AuthProvider>
      <SideMenuProvider>{children}</SideMenuProvider>
    </AuthProvider>
  );
};

export default Hooks;
