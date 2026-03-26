import styles from './Authority.module.css';

export default function Authority() {
  return (
    <section className={styles.authoritySection}>
      <div className={`container ${styles.container}`}>
        <h2 className={styles.title}>Nuestras Acreditaciones</h2>
        
        <div className={styles.badgesWrapper}>
          
          <div className={styles.badge}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
               <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span>UBA Medicina</span>
          </div>

          <div className={styles.badge}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
               <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
               <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>Especialista Ayurveda</span>
          </div>

          <div className={styles.badge}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
               <circle cx="12" cy="12" r="10"/>
               <path d="M12 16v-4"/>
               <path d="M12 8h.01"/>
            </svg>
            <span>Certificación Int.</span>
          </div>

        </div>
      </div>
    </section>
  );
}
