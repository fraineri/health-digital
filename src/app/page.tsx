import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Authority from '@/components/Authority/Authority';
import ServicePath from '@/components/ServicePath/ServicePath';
import FAQ from '@/components/FAQ/FAQ';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Authority />
        <ServicePath />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
