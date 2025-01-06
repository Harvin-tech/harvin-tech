import type { Metadata } from 'next';
import './globals.scss';
import { AppProviders } from '@/lib/providers';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import GlobalProvider from './GlobalProvider';
import { NextUIProvider } from '@nextui-org/react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Harvin',
  description: 'Harvin is a platform for learning and teaching',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-[var(--body-bg)]`}>
        {/* Include  all Providers in file '@/lib/providers.tsx' insead of here */}
        <GlobalProvider>
          <AppProviders>
            <NextUIProvider>
              <Header />
              {children}
              <Footer />
              <Toaster position="top-center" richColors />
            </NextUIProvider>
          </AppProviders>
        </GlobalProvider>
      </body>
    </html>
  );
}
