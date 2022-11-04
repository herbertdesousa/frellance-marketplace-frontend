import React, { useCallback, useEffect, useState } from 'react';

import { adminApi } from '@/services/api';

import { AdminContact } from '@/types/AdminContact';

import AdminNav from '../components/AdminNav';
import AdminContactsItem from './AdminContactsItem';

const AdminContacts: React.FC = () => {
  const [data, setData] = useState<AdminContact[]>([]);

  const fetchData = useCallback(async () => {
    await adminApi.get('/contacts').then(res => setData(res.data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="relative max-width">
      <AdminNav title="Contatos" />

      <div className="md:max-w-sm">
        {!!data.length && (
          <ul>
            {data.map(item => (
              <AdminContactsItem key={item.id} item={item} onSave={fetchData} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminContacts;
