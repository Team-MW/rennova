'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

export default function Expertise() {
  return (
    <div style={{ paddingTop: '72px' }}>
      <section className={s.expertise}>
        <div className={s.expertiseL}>
          <R>
            <p className={s.label}>Notre Expertise</p>
            <h1 className={s.h2}>
              Des savoir-faire<br />précis et rigoureux.
            </h1>
            <p className={s.body}>
              Depuis 2018, REONOVA intervient sur des chantiers de rénovation intérieure haut de gamme en Occitanie. Nous maîtrisons chaque étape du second œuvre, du cloisonnement à la finition.
            </p>
            <Link href="/contact" className={s.btnInk}>Nous contacter</Link>
          </R>
        </div>
        <div className={s.expertiseR}>
          {[
            { num: '01', title: 'Plaquisterie', txt: 'Pose de plaques de plâtre, cloisons de distribution, plafonds suspendus et doublages isolants. Respect strict des règles DTU.' },
            { num: '02', title: 'Jointure & Enduits', txt: 'Jointage des plaques BA13, application d\'enduits de lissage, finitions planes parfaites prêtes à recevoir la peinture.' },
            { num: '03', title: 'Peinture', txt: 'Application de peintures intérieures professionnelles. Conseils colorimètriques, préparation des supports, finition irréprochable.' },
            { num: '04', title: 'Rénovation Complète', txt: 'Pilotage global de vos projets de rénovation intérieure, du second œuvre à la livraison clé en main.' },
          ].map((item, i) => (
            <R key={item.num} delay={i * 80} cls={s.expCard}>
              <div className={s.expCardInner}>
                <span className={s.expNum}>{item.num}</span>
                <div>
                  <h3 className={s.expTitle}>{item.title}</h3>
                  <p className={s.expTxt}>{item.txt}</p>
                </div>
              </div>
            </R>
          ))}
        </div>
      </section>
    </div>
  );
}
