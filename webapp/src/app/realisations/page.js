'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import s from '../shared.module.css';

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, on];
}

function R({ children, cls = '', delay = 0 }) {
  const [ref, on] = useReveal();
  return (
    <div ref={ref} className={`${s.rv} ${on ? s.rvOn : ''} ${cls}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Realisations() {
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--carbon, #143546)' }}>
      <section className={s.real}>
        <R cls={s.realHead}>
          <p className={s.label}>Réalisations</p>
          <h1 className={s.h2White}>Nos derniers projets.</h1>
        </R>
        <div className={s.realGrid}>
          <R cls={s.realBig}>
            <div className={s.realImg}>
              <Image src="/r1.jpg" alt="Appartement Haussmannien rénové" fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 60vw" />
              <div className={s.realOverlay}>
                <div className={s.realTag}>Rénovation complète</div>
                <div className={s.realInfo}>
                  <h4 className={s.realTitle}>Appartement Haussmannien</h4>
                  <p className={s.realSub}>Toulouse Centre — 110 m²</p>
                </div>
              </div>
            </div>
          </R>
          <div className={s.realSmalls}>
            <R cls={s.realSmall}>
              <div className={s.realImg}>
                <Image src="/s1.jpg" alt="Chantier plaquisterie jointure" fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 40vw" />
                <div className={s.realOverlay}>
                  <div className={s.realTag}>Plaquisterie</div>
                  <div className={s.realInfo}>
                    <h4 className={s.realTitle}>Jointure & Finitions</h4>
                    <p className={s.realSub}>Toulouse Lardenne — 65 m²</p>
                  </div>
                </div>
              </div>
            </R>
            <R cls={s.realSmall} delay={100}>
              <div className={s.realImg}>
                <Image src="/r2.jpg" alt="Couloir rénové" fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 40vw" />
                <div className={s.realOverlay}>
                  <div className={s.realTag}>Peinture</div>
                  <div className={s.realInfo}>
                    <h4 className={s.realTitle}>Couloir & Espaces</h4>
                    <p className={s.realSub}>Colomiers — 90 m²</p>
                  </div>
                </div>
              </div>
            </R>
          </div>
        </div>
      </section>
    </div>
  );
}
