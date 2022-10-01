import { Page } from '@/types/Page';
import { SideMenuProvider } from './sideMenu';

const Hooks: Page = ({ children }) => {
  return <SideMenuProvider>{children}</SideMenuProvider>;
};

export default Hooks;
