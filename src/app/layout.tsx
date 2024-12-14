import type { Metadata } from 'next';
import './globals.scss';
import { AppProviders } from '@/lib/providers';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Poppins } from 'next/font/google';

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
      <body className={`${poppins.className}`}>
        {/* Include  all Providers in file '@/lib/providers.tsx' insead of here */}
        <AppProviders>
          <Header />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
