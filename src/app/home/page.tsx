import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Authority from '@/components/Authority/Authority';
import ServicePath from '@/components/ServicePath/ServicePath';
import AboutMe from '@/components/AboutMe/AboutMe';
import Specialties from '@/components/Specialties/Specialties';
import Testimonials from '@/components/Testimonials/Testimonials';
import FAQ from '@/components/FAQ/FAQ';
import BookingWidget from '@/components/BookingWidget/BookingWidget';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Authority />
        <AboutMe />
        <Specialties />
        <ServicePath />
        <Testimonials />
        <FAQ />
        {/* IMPORTANTE: Reemplaza "tu-usuario/consulta-virtual" con tu link real de Cal.com */}
        <BookingWidget calLink="franco-raineri-c0ht5q/consulta-virtual" />
      </main>
      <Footer />
    </>
  );
}
