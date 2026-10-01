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

export default function APropos() {
  return (
    <div style={{ paddingTop: '72px' }}>
      <section className={s.about}>
        <R cls={s.aboutPicWrap}>
          <div className={s.aboutPic}>
            <Image src="/s2.jpg" alt="Artisan peintre REONOVA" fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </R>
        <div className={s.aboutContent}>
          <R>
            <p className={s.label}>À Propos</p>
            <h1 className={s.h2}>
              Fondés sur<br />l&apos;exigence.
            </h1>
            <p className={s.body}>
              REONOVA est une entreprise artisanale spécialisée dans le second œuvre intérieur. Fondée par des compagnons de métier, nous intervenons sur des chantiers résidentiels et tertiaires avec la même rigueur et le même souci du détail.
            </p>
            <p className={s.body} style={{ marginTop: '1.25rem' }}>
              Chaque chantier est unique. Nous adaptons nos méthodes, nos matériaux et notre organisation à votre projet pour garantir une prestation à la hauteur de vos attentes.
            </p>
            <div className={s.aboutBadges}>
              {['Artisan Certifié RGE', 'Assurance Décennale', 'Devis Gratuit sous 48h', 'Intervention Occitanie'].map(b => (
                <span key={b} className={s.badge}>{b}</span>
              ))}
            </div>
          </R>
        </div>
      </section>
    </div>
  );
}
