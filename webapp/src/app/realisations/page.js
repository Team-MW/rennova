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
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--pearl, #f8f9fa)' }}>
      <section className={s.real}>
        <R cls={s.realHead}>
          <p className={s.label}>Portfolio</p>
          <h1 className={s.h2}>Nos dernières réalisations.</h1>
          <p className={s.body}>
            Découvrez une sélection de chantiers de rénovation intérieure menés par nos artisans. De la restructuration d'espaces à la finition peinture haute couture.
          </p>
        </R>

        <div className={s.realGrid}>
          {[
            { tag: 'Rénovation Complète', title: 'Appartement Haussmannien', sub: 'Toulouse Centre — 110 m²', img: '/r1.jpg' },
            { tag: 'Plaquisterie', title: 'Villa Contemporaine', sub: 'Balma — 150 m²', img: '/chantiers-plaquiste.webp' },
            { tag: 'Peinture', title: 'Loft Industriel', sub: 'Toulouse — 90 m²', img: '/r2.jpg' },
            { tag: 'Agencement', title: 'Boutique de Luxe', sub: 'Toulouse Carmes — 65 m²', img: '/s1.jpg' },
            { tag: 'Jointure & Enduits', title: 'Bureaux d\'entreprise', sub: 'Labège — 200 m²', img: '/jointeur.webp' },
            { tag: 'Faux-plafonds', title: 'Maison Toulousaine', sub: 'Tournefeuille — 130 m²', img: '/s-plaquiste.png' },
          ].map((item, i) => (
            <R key={i} delay={i * 50} cls={s.realItem}>
              <div className={s.realImg}>
                <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="(max-width:900px) 100vw, 50vw" />
              </div>
              <div className={s.realOverlay}>
                <div>
                  <h4 className={s.realTitle}>{item.title}</h4>
                  <p className={s.realSub}>{item.sub}</p>
                </div>
              </div>
            </R>
          ))}
        </div>
      </section>
    </div>
  );
}
