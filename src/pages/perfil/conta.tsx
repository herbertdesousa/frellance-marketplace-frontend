import { Page } from '@/types/Page';

import { ProfileNav } from '@/modules/Profile';
import { Button, Footer, TextField, Toggle } from '@/components';

import { ProfileAccountItem } from '@/modules/Profile/ProfileAccount';

const Account: Page = () => {
  return (
    <>
      <ProfileNav />

      <div className="max-width mt-10">
        <h1 className="text-2xl font-merriweather font-bold mb-8">
          Sobre Você
        </h1>

        <ul className="md:max-w-sm">
          <ProfileAccountItem
            label="Seu Nome"
            value="cleber da silva"
            edit={{
              buttonLabel: 'Editar',
              editElement: ({ closeEdit }) => (
                <div className="w-full">
                  <TextField
                    name="name"
                    label="Seu Nome"
                    placeholder="Digite seu Nome"
                  />
                  <div className="flex mt-2">
                    <Button className="mr-2">Salvar</Button>
                    <Button variant="outline" onClick={closeEdit}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ),
            }}
          />

          <div className="w-full bg-gray1 my-4" style={{ height: 1 }} />

          <ProfileAccountItem label="Seu Email" value="cleber@gmail.com" />

          <div className="w-full bg-gray1 my-4" style={{ height: 1 }} />

          <ProfileAccountItem
            label="Seu Telefone"
            value="(11) 40002-8922"
            edit={{
              buttonLabel: 'Editar',
              editElement: ({ closeEdit }) => (
                <div className="w-full">
                  <TextField
                    name="name"
                    label="Seu Telefone"
                    placeholder="Digite seu Telefone"
                  />
                  <div className="flex mt-2">
                    <Button className="mr-2">Salvar</Button>
                    <Button variant="outline" onClick={closeEdit}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ),
            }}
          />

          <div className="w-full bg-gray1 my-4" style={{ height: 1 }} />

          <ProfileAccountItem
            label="Sua Senha"
            value="***********"
            edit={{
              buttonLabel: 'Atualizar',
              editElement: ({ closeEdit }) => (
                <div className="w-full">
                  <TextField
                    name="name"
                    label="Antiga Senha"
                    placeholder="Digite a antiga senha"
                  />
                  <TextField
                    name="name"
                    label="Nova Senha"
                    placeholder="Digite a nova senha"
                    className="mt-2"
                  />
                  <TextField
                    name="name"
                    label="Confirme a Nova Senha"
                    placeholder="Confirme a nova senha"
                    className="mt-2"
                  />
                  <div className="flex mt-4">
                    <Button className="mr-2">Salvar</Button>
                    <Button variant="outline" onClick={closeEdit}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ),
            }}
          />
        </ul>
      </div>

      <div className="max-width mt-10">
        <h1 className="text-2xl font-merriweather font-bold mb-8">
          Notificações
        </h1>

        <div className="flex justify-between items-start md:max-w-sm">
          <div className="flex flex-col">
            <span className="text-gray3">Mensagem</span>

            <strong className="font-medium mt-1">
              Receber notificação no email quando mensagem no chat for recebida.
            </strong>
          </div>

          <Toggle name="notify-message-from-chat" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Account;
