import { Page } from '@/types/Page';

import { useRouter } from 'next/router';

import { Button } from '@/components';

const AdminHome: Page = () => {
  const router = useRouter();

  return (
    <div className="max-width">
      <div className="md:max-w-sm">
        <h1 className="text-2xl font-merriweather font-bold mb-6 mt-8">
          Painel de ADM
        </h1>

        <div className="mt-8">
          <Button
            variant="outline"
            onClick={() => router.push('/admin/itens-home')}
          >
            Selecionar Itens na Home
          </Button>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => router.push('/admin/contacts')}
          >
            Contatos
          </Button>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => router.push('/admin/categories')}
          >
            Categorias
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
