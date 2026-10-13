'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from '../shared.module.css';
import style from './page.module.css';
import BeforeAfter from '../../components/BeforeAfter';
import { apresPhotos, avantPhotos, comparisons } from '../../data/avantApres';

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true);
        obs.disconnect();
      }
    }, { threshold });
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
  const [featured, ...rest] = comparisons;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--pearl, #f8f9fa)' }}>
      <section className={style.heroReal}>
        <div className={style.heroRealBg} />
        <div className={style.heroRealContent}>
          <R>
            <p className={s.label} style={{ color: 'var(--gold)' }}>Avant / Après</p>
            <h1 className={s.h2White} style={{ marginBottom: '1.5rem' }}>
              Du chantier brut <br /><em>au rendu fini.</em>
            </h1>
            <p className={s.bodyWhite} style={{ margin: '0 auto' }}>
              Glissez sur chaque photo pour voir la pièce avant les travaux, puis une fois les cloisons, les enduits et la peinture terminés.
            </p>
          </R>
        </div>
      </section>

      <section className={style.gallery}>
        <R>
          <BeforeAfter
            before={featured.before}
            after={featured.after}
            title={featured.title}
            place={featured.place}
            large
            priority
          />
        </R>

        <div className={style.baGrid}>
          {rest.map((item, i) => (
            <R key={item.id} delay={(i % 4) * 60}>
              <BeforeAfter
                before={item.before}
                after={item.after}
                title={item.title}
                place={item.place}
              />
            </R>
          ))}
        </div>

        <div className={style.split}>
          <div>
            <p className={s.label}>Avant</p>
            <h2 className={s.h2}>Le chantier <em>en cours.</em></h2>
            <div className={style.photoGrid}>
              {avantPhotos.map((photo) => (
                <div key={photo.src} className={style.photoItem}>
                  <Image src={photo.src} alt={photo.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 800px) 50vw, 25vw" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className={s.label}>Après</p>
            <h2 className={s.h2}>Le rendu <em>fini.</em></h2>
            <div className={style.photoGrid}>
              {apresPhotos.map((photo) => (
                <div key={photo.src} className={style.photoItem}>
                  <Image src={photo.src} alt={photo.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 800px) 50vw, 25vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={style.cta}>
        <div className={style.ctaContent}>
          <R>
            <p className={s.label} style={{ color: 'var(--ink)' }}>Votre Projet</p>
            <h2 className={style.ctaTitle}>Prêt à transformer votre intérieur ?</h2>
            <p className={style.ctaBody}>
              Rénovation complète, plaquisterie ou peinture : décrivez votre pièce, nous revenons vers vous avec un devis clair.
            </p>
            <Link href="/contact" className={style.btnDark}>
              Obtenir un devis gratuit
            </Link>
          </R>
        </div>
      </section>
    </div>
  );
}
