import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Authority from '@/components/Authority/Authority';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Authority />
      </main>
    </>
  );
}
