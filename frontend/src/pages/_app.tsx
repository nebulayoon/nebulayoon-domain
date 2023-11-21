import { Header, LoggedinHeader } from '@/components/Header';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Base from './Base';
import { LoginState } from '@/states/state';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Base />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}
