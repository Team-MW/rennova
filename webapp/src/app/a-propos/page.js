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
            <Image src="/chantiers-plaquiste.webp" alt="Artisan peintre RENOVA" fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </R>
        <div className={s.aboutContent}>
          <R>
            <p className={s.label}>À Propos</p>
            <h1 className={s.h2}>
              Fondés sur<br />l&apos;exigence.
            </h1>
            <p className={s.body}>
              RENOVA est une entreprise artisanale spécialisée dans l&apos;aménagement intérieur et les travaux de finition haut de gamme (plaquisterie, jointure, peinture). Nous intervenons sur des chantiers résidentiels et tertiaires avec une rigueur absolue.
            </p>
            <p className={s.body} style={{ marginTop: '1.25rem' }}>
              <strong>L&apos;exigence du &quot;chantier propre&quot; :</strong> Nous savons qu&apos;engager des travaux peut être stressant. C&apos;est pourquoi nous faisons de la propreté notre priorité absolue. Nos équipes protègent intégralement vos sols et votre mobilier avant chaque intervention. Nous utilisons des outils équipés de systèmes d&apos;aspiration pour limiter la poussière, et nous laissons les lieux impeccables chaque soir.
            </p>
            <p className={s.body} style={{ marginTop: '1.25rem' }}>
              De la première plaque de BA13 posée jusqu&apos;au dernier coup de pinceau, nous refusons tout compromis sur la qualité des matériaux et des finitions.
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
