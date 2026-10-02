'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from '../shared.module.css';
import style from './page.module.css';

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
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
      {/* Hero Section */}
      <section className={style.heroAbout}>
        <div className={style.heroBg} />
        <div className={style.heroContent}>
          <R>
            <h1 className={s.h2White} style={{ marginBottom: '2rem', fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
              L&apos;artisanat<br /><em>sans compromis.</em>
            </h1>
            <p className={s.bodyWhite} style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
              RENOVA est une entreprise spécialisée dans l'aménagement intérieur. Depuis notre création, nous concevons notre métier avec une exigence technique et esthétique rigoureuse.
            </p>
          </R>
        </div>
      </section>

      {/* Editorial Story Section */}
      <section className={style.storyEditorial}>
        <div className={style.storyEditorialInner}>
          <div className={style.storyText}>
            <R>
              <h2 className={s.h2} style={{ marginBottom: '2rem' }}>Notre<br /><em>vision.</em></h2>
              <p className={s.body} style={{ marginBottom: '1.5rem', color: 'var(--ink)' }}>
                Engager des travaux de rénovation est souvent perçu comme une épreuve. Notre objectif est de changer cette perception en apportant de la sérénité à chaque étape du projet.
              </p>
              <p className={s.body} style={{ marginBottom: '2.5rem' }}>
                Nous n'utilisons pas de méthodes expéditives. Que ce soit pour le montage d'une cloison complexe, l'application d'un enduit de lissage ou une peinture haute définition, chaque geste est calculé pour offrir une durabilité et un rendu visuel parfaits. L'artisanat, pour nous, c'est le respect des règles de l'art couplé à une organisation millimétrée.
              </p>
              <div className={s.aboutBadges}>
                {['Artisan RGE', 'Assurance Décennale', 'Intervention Occitanie'].map(b => (
                  <span key={b} className={s.badge} style={{ borderColor: 'var(--ink)', color: 'var(--ink)' }}>{b}</span>
                ))}
              </div>
            </R>
          </div>
          <R cls={style.storyImageWrapper}>
            <Image src="/s2.jpg" alt="Chantier de rénovation RENOVA" fill style={{ objectFit: 'cover' }} sizes="(max-width:900px) 100vw, 50vw" />
          </R>
        </div>
      </section>

      {/* Minimalist Approach Section (Replaces the emoji/card layout) */}
      <section className={style.approach}>
        <div className={style.approachInner}>
          <div className={style.approachHeader}>
            <R>
              <h2 className={s.h2}>Notre approche</h2>
              <p className={s.body} style={{ marginTop: '1.5rem' }}>
                Trois principes fondateurs qui guident chacune de nos interventions, du premier contact jusqu'à la livraison finale du chantier.
              </p>
            </R>
          </div>
          <div className={style.approachList}>
            <R delay={100} cls={style.approachItem}>
              <div className={style.approachNum}>01.</div>
              <h3 className={style.approachTitle}>La préparation du support</h3>
              <p className={style.approachText}>
                Un résultat final parfait dépend entièrement de ce qui est invisible. Nous accordons une importance capitale au ratissage, à l'enduisage et au ponçage (réalisé avec des machines aspirantes). C'est cette exigence sur les fondations qui garantit une finition Q4.
              </p>
            </R>
            <R delay={200} cls={style.approachItem}>
              <div className={style.approachNum}>02.</div>
              <h3 className={style.approachTitle}>Le respect du lieu</h3>
              <p className={style.approachText}>
                Un chantier ne doit pas être une zone de chaos. La protection intégrale de vos sols, le bâchage minutieux de votre mobilier et le nettoyage quotidien des zones de travail sont pour nous des prérequis non négociables.
              </p>
            </R>
            <R delay={300} cls={style.approachItem}>
              <div className={style.approachNum}>03.</div>
              <h3 className={style.approachTitle}>La tenue des engagements</h3>
              <p className={style.approachText}>
                Nous concevons des plannings réalistes et nous nous y tenons. Vous avez un interlocuteur unique qui supervise l'avancement, contrôle la qualité d'exécution et vous informe en toute transparence.
              </p>
            </R>
          </div>
        </div>
      </section>
      
      <section style={{ background: 'var(--ink)', padding: '6rem 5vw', textAlign: 'center' }}>
        <R>
          <h2 className={s.h2White} style={{ marginBottom: '2rem' }}>Confiez-nous votre intérieur.</h2>
          <Link href="/contact" className={s.btnGold}>Démarrer un projet</Link>
        </R>
      </section>
    </div>
  );
}
