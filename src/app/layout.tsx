import type { Metadata } from 'next';
import './globals.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import { NextUIProvider } from '@nextui-org/react';
import GlobalProvider from '@/lib/global-provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Harvinn',
  description: 'Harvinn is a platform for learning and teaching.',
  icons: '/harvinlogo.jpg',
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
          <NextUIProvider>
            <Header />
            {children}
            <Footer />
            <Toaster position="top-center" richColors />
          </NextUIProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
