import Image from 'next/image';
import styles from './AboutMe.module.css';

export default function AboutMe() {
  return (
    <section className={styles.aboutSection} id="filosofia">
      <div className={`container ${styles.container}`}>
        
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            {/* Usamos un placeholder ilustrativo, el usuario lo puede cambiar luego */}
            <Image
              src="/doctora-retrato.png" /* Idealmente el usuario sube su propia foto aquí */
              alt="Dra. especialista en medicina integrativa"
              fill
              className={styles.aboutImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Elemento de diseño orgánico detrás de la imagen */}
            <div className={styles.decorativeShape}></div>
          </div>
        </div>

        <div className={styles.contentColumn}>
          <span className={styles.badge}>SOBRE MÍ</span>
          <h2 className={styles.title}>
            Integrando la ciencia y la sabiduría milenaria
          </h2>
          
          <div className={styles.description}>
            <p>
              Mi enfoque nace de una convicción profunda: el cuerpo humano no es
              un conjunto de partes aisladas, sino un ecosistema donde todo está conectado. 
              Como médica, mi compromiso es ir más allá del síntoma y comprender 
              la raíz de tu malestar.
            </p>
            <p>
              Combinando la precisión diagnóstica de la <strong>medicina alopática tradicional</strong> con 
              la visión holística y preventiva del <strong>Ayurveda</strong>, diseñamos estrategias 
              médicas que respetan tu ritmo natural y fomentan una sanación real 
              y duradera.
            </p>
          </div>

          <div className={styles.signature}>
            <h4 className={styles.doctorName}>Dra. Nombre Apellido</h4>
            <span className={styles.doctorRole}>MD, Especialista en Medicina Integrativa</span>
          </div>
        </div>

      </div>
    </section>
  );
}
