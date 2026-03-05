import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        
        {/* Left Column: Image wrapper with aesthetic styling */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <Image
              src="/hero-doctor.png"
              alt="Dra. en consultorio de medicina integrativa"
              fill
              priority
              className={styles.heroImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Soft organic overlay/shadow for depth */}
            <div className={styles.imageOverlay}></div>
          </div>
        </div>

        {/* Right Column: Hero copy and CTAs */}
        <div className={styles.contentColumn}>
          <h1 className={styles.title}>
            Medicina Integrativa: Lo mejor de Occidente y Ayurveda
          </h1>
          <p className={styles.subtitle}>
            Un enfoque holístico para tu bienestar combinando ciencia médica moderna rigurosa y la sabiduría milenaria del Ayurveda para un equilibrio real.
          </p>
          
          <div className={styles.buttonGroup}>
            <Link href="#reservar" className={styles.btnPrimary}>
              Reservar Consulta
            </Link>
            <Link href="#saber-mas" className={styles.btnOutline}>
              Saber más
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
