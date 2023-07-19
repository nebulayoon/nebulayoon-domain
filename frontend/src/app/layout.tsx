import '../css/global.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'nebulayoon',
  description: 'nebulayoon personal app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <Header />
        {children}
        <footer></footer>
      </body>
    </html>
  );
}
