import Navbar from './_components/Navbar/Navbar';
import Hero from './_components/Hero/Hero';
import Authority from './_components/Authority/Authority';
import ServicePath from './_components/ServicePath/ServicePath';
import AboutMe from './_components/AboutMe/AboutMe';
import Specialties from './_components/Specialties/Specialties';
import Testimonials from './_components/Testimonials/Testimonials';
import FAQ from './_components/FAQ/FAQ';
import BookingWidget from './_components/BookingWidget/BookingWidget';
import Footer from './_components/Footer/Footer';

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
