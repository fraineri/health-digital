import Navbar from '@/components/Navbar/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ textAlign: 'center' }}>Medicina Clínica y Ayurveda para tu equilibrio integral</h1>
      </main>
    </>
  );
}
