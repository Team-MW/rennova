'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from '../shared.module.css';
import style from './page.module.css';

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

const projects = [
  { id: 38, cat: 'Rénovation Complète', title: 'Travaux de Rénovation', sub: 'Toulouse', img: '/portfolio/p-29.jpg' },
  { id: 39, cat: 'Rénovation Complète', title: 'Rénovation Intérieure', sub: 'Toulouse', img: '/portfolio/p-30.jpg' },
  { id: 40, cat: 'Plaquisterie', title: 'Chantier Plaquisterie', sub: 'Nantes/Vendée', img: '/portfolio/p-31.webp' },
  { id: 41, cat: 'Agencement', title: 'Agencement Intérieur', sub: 'Toulouse', img: '/portfolio/p-32.jpg' },
  { id: 1, cat: 'Rénovation Complète', title: 'Appartement Haussmannien', sub: 'Toulouse Centre — 110 m²', img: '/r1.jpg' },
  { id: 2, cat: 'Plaquisterie', title: 'Villa Contemporaine', sub: 'Balma — 150 m²', img: '/chantiers-plaquiste.webp' },
  { id: 3, cat: 'Peinture', title: 'Loft Industriel', sub: 'Toulouse — 90 m²', img: '/r2.jpg' },
  { id: 4, cat: 'Agencement', title: 'Boutique de Luxe', sub: 'Toulouse Carmes — 65 m²', img: '/s1.jpg' },
  { id: 5, cat: 'Jointure', title: 'Bureaux d\'entreprise', sub: 'Labège — 200 m²', img: '/jointeur.webp' },
  { id: 6, cat: 'Plaquisterie', title: 'Maison Toulousaine', sub: 'Tournefeuille — 130 m²', img: '/s-plaquiste.avif' },
  { id: 10, cat: 'Rénovation Complète', title: 'Projet de Rénovation', sub: 'Occitanie', img: '/portfolio/p-1.jpg' },
  { id: 11, cat: 'Peinture', title: 'Finition Premium', sub: 'Occitanie', img: '/portfolio/p-2.jpg' },
  { id: 12, cat: 'Agencement', title: 'Création d\'Espace', sub: 'Occitanie', img: '/portfolio/p-3.jpg' },
  { id: 13, cat: 'Plaquisterie', title: 'Doublage & Cloisons', sub: 'Occitanie', img: '/portfolio/p-4.jpg' },
  { id: 14, cat: 'Jointure', title: 'Finition Haute Définition', sub: 'Occitanie', img: '/portfolio/p-5.jpg' },
  { id: 15, cat: 'Peinture', title: 'Projet Résidentiel', sub: 'Occitanie', img: '/portfolio/p-6.jpg' },
  { id: 16, cat: 'Rénovation Complète', title: 'Projet de Rénovation', sub: 'Occitanie', img: '/portfolio/p-7.jpg' },
  { id: 17, cat: 'Peinture', title: 'Mise en Peinture', sub: 'Occitanie', img: '/portfolio/p-8.jpg' },
  { id: 18, cat: 'Agencement', title: 'Agencement Intérieur', sub: 'Occitanie', img: '/portfolio/p-9.jpg' },
  { id: 19, cat: 'Rénovation Complète', title: 'Projet de Rénovation', sub: 'Occitanie', img: '/portfolio/p-10.jpg' },
  { id: 20, cat: 'Plaquisterie', title: 'Travaux de Plaquisterie', sub: 'Occitanie', img: '/portfolio/p-11.jpg' },
  { id: 21, cat: 'Jointure', title: 'Joints Parfaits', sub: 'Occitanie', img: '/portfolio/p-12.jpg' },
  { id: 22, cat: 'Peinture', title: 'Peinture Haut de Gamme', sub: 'Occitanie', img: '/portfolio/p-13.jpg' },
  { id: 23, cat: 'Rénovation Complète', title: 'Projet RENOVA', sub: 'Occitanie', img: '/portfolio/p-14.jpg' },
  { id: 24, cat: 'Agencement', title: 'Agencement Sur-Mesure', sub: 'Occitanie', img: '/portfolio/p-15.jpg' },
  { id: 25, cat: 'Rénovation Complète', title: 'Projet de Rénovation', sub: 'Occitanie', img: '/portfolio/p-16.jpg' },
  { id: 26, cat: 'Plaquisterie', title: 'Création de Plafond', sub: 'Occitanie', img: '/portfolio/p-17.jpg' },
  { id: 27, cat: 'Peinture', title: 'Projet Résidentiel', sub: 'Occitanie', img: '/portfolio/p-18.jpg' },
  { id: 28, cat: 'Rénovation Complète', title: 'Rénovation Complète', sub: 'Occitanie', img: '/portfolio/p-19.jpg' },
  { id: 29, cat: 'Jointure', title: 'Finition Q4', sub: 'Occitanie', img: '/portfolio/p-20.jpg' },
  { id: 30, cat: 'Rénovation Complète', title: 'Projet de Rénovation', sub: 'Occitanie', img: '/portfolio/p-21.jpg' },
  { id: 31, cat: 'Peinture', title: 'Projet Peinture', sub: 'Occitanie', img: '/portfolio/p-22.jpg' },
  { id: 32, cat: 'Plaquisterie', title: 'Plaquisterie', sub: 'Occitanie', img: '/portfolio/p-23.jpg' },
  { id: 33, cat: 'Rénovation Complète', title: 'Projet de Rénovation', sub: 'Occitanie', img: '/portfolio/p-24.jpg' },
  { id: 34, cat: 'Agencement', title: 'Agencement Intérieur', sub: 'Occitanie', img: '/portfolio/p-25.jpg' },
  { id: 35, cat: 'Peinture', title: 'Finition Premium', sub: 'Occitanie', img: '/portfolio/p-26.jpg' },
  { id: 36, cat: 'Jointure', title: 'Projet Jointure', sub: 'Occitanie', img: '/portfolio/p-27.jpg' },
  { id: 37, cat: 'Rénovation Complète', title: 'Projet de Rénovation', sub: 'Occitanie', img: '/portfolio/p-28.jpg' },
];

const categories = ['Tous', 'Rénovation Complète', 'Plaquisterie', 'Peinture', 'Agencement', 'Jointure'];

export default function Realisations() {
  const [filter, setFilter] = useState('Tous');
  
  const filteredProjects = useMemo(() => {
    if (filter === 'Tous') return projects;
    return projects.filter(p => p.cat === filter);
  }, [filter]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--pearl, #f8f9fa)' }}>
      {/* Enhanced Hero Section */}
      <section className={style.heroReal}>
        <div className={style.heroRealBg} />
        <div className={style.heroRealContent}>
          <R>
            <p className={s.label} style={{ color: 'var(--gold)' }}>Notre Portfolio</p>
            <h1 className={s.h2White} style={{ marginBottom: '1.5rem' }}>
              Nos dernières <br /><em>réalisations.</em>
            </h1>
            <p className={s.bodyWhite} style={{ margin: '0 auto' }}>
              Découvrez une sélection de chantiers de rénovation intérieure menés par nos artisans. De la restructuration d&apos;espaces à la finition peinture haute couture. L&apos;excellence à chaque détail.
            </p>
          </R>
        </div>
      </section>

      <section className={s.real} style={{ paddingTop: '6rem' }}>
        {/* Filters */}
        <R delay={100}>
          <div className={style.filters}>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`${style.filterBtn} ${filter === cat ? style.filterBtnActive : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </R>

        {/* Project Grid */}
        <div className={s.realGrid}>
          {filteredProjects.map((item, i) => (
            <R key={item.id} delay={(i % 6) * 50} cls={s.realItem}>
              <div className={s.realImg}>
                <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="(max-width:900px) 100vw, 50vw" />
              </div>
              <div className={s.realOverlay}>
                <div>
                  <div className={s.realTag}>{item.cat}</div>
                  <h4 className={s.realTitle}>{item.title}</h4>
                  <p className={s.realSub}>{item.sub}</p>
                </div>
              </div>
            </R>
          ))}
        </div>
      </section>

      {/* New CTA Section */}
      <section className={style.cta}>
        <div className={style.ctaContent}>
          <R>
            <p className={s.label} style={{ color: 'var(--ink)' }}>Votre Projet</p>
            <h2 className={style.ctaTitle}>Prêt à transformer votre intérieur ?</h2>
            <p className={style.ctaBody}>
              Que ce soit pour une rénovation complète, de la plaquisterie complexe ou des finitions de peinture haut de gamme, notre équipe est à votre écoute pour concrétiser votre vision.
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
