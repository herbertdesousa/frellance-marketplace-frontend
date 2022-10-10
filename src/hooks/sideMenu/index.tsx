import { useContext, useRef, createContext } from 'react';
import { Page } from '@/types/Page';

import { SideMenuRef } from '@/components/SideMenu';

import SideMenuComponent from '@/modules/hooks/SideMenu';

const SideMenuContext = createContext<SideMenuType>({} as SideMenuType);

function useSideMenu(): SideMenuType {
  const context = useContext(SideMenuContext);

  if (!context) {
    throw new Error('useCustomers must be used within an CustomersContext');
  }

  return context;
}

interface SideMenuType {
  sideMenuRef: React.RefObject<SideMenuRefUpdated>;
}

export type SideMenuRefUpdated = SideMenuRef & {
  open(side?: 'left' | 'right'): void;
};

const SideMenuProvider: Page = ({ children }) => {
  const sideMenuRef = useRef<SideMenuRef>(null);

  return (
    <>
      <SideMenuContext.Provider value={{ sideMenuRef }}>
        {children}
        <SideMenuComponent />
      </SideMenuContext.Provider>
    </>
  );
};

export { SideMenuProvider, useSideMenu };
