import type { NextPage } from 'next';
import Head from 'next/head';

import { SWRConfigComponent } from '@/lib/SWRConfig';
import Hooks from '@/hooks';

import 'tailwindcss/tailwind.css';
import '../styles/main.css';

const App: NextPage = ({ Component, pageProps }: any) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <SWRConfigComponent>
      <Hooks>
        <Component {...pageProps} />
      </Hooks>
    </SWRConfigComponent>
  </>
);

export default App;
