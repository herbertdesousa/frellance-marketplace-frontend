import { Page } from '@/types/Page';

import { AdminAuth, AdminDashHero } from '@/modules/pages/Admin';

import { useState } from 'react';

const Admin: Page = () => {
  const [isAuthed, setIsAuthed] = useState(false);

  return (
    <>
      {!isAuthed && <AdminAuth onAuthed={() => setIsAuthed(true)} />}
      {isAuthed && <AdminDashHero />}
    </>
  );
};

export default Admin;
