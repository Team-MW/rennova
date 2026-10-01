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
              Depuis 2018, RENOVA intervient sur des chantiers de rénovation intérieure haut de gamme en Occitanie. Nous maîtrisons chaque étape du second œuvre, du cloisonnement à la finition.
            </p>
            <Link href="/contact#devis" className={s.btnInk}>Nous contacter</Link>
          </R>
        </div>
        <div className={s.expertiseR}>
          {[
            { num: '01', title: 'Plaquisterie & Isolation', txt: 'Pose de cloisons distributives, faux-plafonds techniques et doublages thermiques. Notre maîtrise absolue du placo (BA13, phonique, hydrofuge) garantit une géométrie parfaite de vos volumes, essentielle pour les étapes suivantes. Isolation certifiée RGE pour un confort thermique optimal.' },
            { num: '02', title: 'Jointure Haute Définition', txt: 'L\'étape cruciale pour un rendu impeccable. Nos jointeurs réalisent des bandes et des enduits d\'une planéité absolue (finition Q3 ou Q4). Un ratissage fin et un ponçage mécanique sans poussière assurent l\'absence totale de spectres sous la lumière rasante.' },
            { num: '03', title: 'Peinture & Finitions', txt: 'La touche finale qui sublime vos espaces. Application au pistolet Airless pour un tendu exceptionnel et homogène, ou au rouleau traditionnel. Nous utilisons des peintures professionnelles (Zolpan, Seigneurie, Farrow & Ball) avec une protection absolue des sols et du mobilier.' },
            { num: '04', title: 'Protection & Propreté', txt: 'Un "chantier propre" n\'est pas une option, c\'est notre standard. De la protection minutieuse des éléments existants (sols, menuiseries, mobilier) jusqu\'au nettoyage complet de fin de chantier, nous vous livrons un espace prêt à vivre.' },
          ].map((item, i) => (
            <R key={item.num} delay={i * 80} cls={s.expCard}>
              <div className={s.expCardInner}>
                <span className={s.expNum}>{item.num}</span>
                <div>
                  <h3 className={s.expTitle}>{item.title}</h3>
                  <p className={s.expTxt} style={{ lineHeight: '1.6', marginTop: '0.5rem', color: 'var(--smoke)' }}>{item.txt}</p>
                </div>
              </div>
            </R>
          ))}
        </div>
      </section>
    </div>
  );
}
