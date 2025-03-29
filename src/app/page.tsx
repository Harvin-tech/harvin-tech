'use client';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Home from '@/components/home';

export default function page() {
  console.log('hello', process.env);
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}
