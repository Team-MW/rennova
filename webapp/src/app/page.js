'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './shared.module.css';

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

function Num({ n, unit = '' }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1600, fps = 60, total = Math.round(dur / (1000 / fps));
        let f = 0;
        const t = setInterval(() => {
          f++;
          setV(Math.round(n * (f / total)));
          if (f >= total) clearInterval(t);
        }, 1000 / fps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [n]);
  return <span ref={ref}>{v}{unit}</span>;
}

function R({ children, cls = '', delay = 0 }) {
  const [ref, on] = useReveal();
  return (
    <div ref={ref} className={`${s.rv} ${on ? s.rvOn : ''} ${cls}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroPic}>
          <Image src="/hero.jpg" alt="Espace rénové par REONOVA" fill priority quality={85} style={{ objectFit: 'cover' }} />
        </div>
        <div className={s.heroVeil} />
        <div className={s.heroBody}>
          <p className={s.heroEyebrow}>Rénovation Intérieure — Occitanie</p>
          <h1 className={s.heroTitle}>
            L&apos;artisanat<br />
            <em>au niveau</em><br />
            de l&apos;excellence.
          </h1>
          <div className={s.heroDivider} />
          <p className={s.heroSub}>
            Jointure · Plaquisterie · Peinture · Rénovation complète
          </p>
          <div className={s.heroCtas}>
            <Link href="/contact" className={s.btnGold}>Demander un devis</Link>
            <Link href="/realisations" className={s.btnGhost}>Voir nos projets</Link>
          </div>
        </div>
        <div className={s.heroScroll}>
          <div className={s.heroScrollLine} />
          <span>Défiler</span>
        </div>
      </section>

      <section className={s.figures}>
        <div className={s.figuresInner}>
          {[
            { n: 350, unit: '+', label: 'Chantiers réalisés' },
            { n: 6,   unit: ' ans', label: "D'expérience" },
            { n: 100, unit: '%', label: 'Devis gratuits' },
            { n: 48,  unit: 'h', label: 'Délai de réponse' },
          ].map(f => (
            <div key={f.label} className={s.fig}>
              <span className={s.figN}><Num n={f.n} unit={f.unit} /></span>
              <span className={s.figL}>{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={s.zone}>
        <div className={s.zoneInner}>
          <R>
            <p className={s.label}>Zone d&apos;intervention</p>
            <h2 className={s.h2}>
              Artisan RGE en<br />
              <em>Haute-Garonne</em>
            </h2>
            <p className={s.body} style={{ marginTop: '1.5rem' }}>
              REONOVA déploie ses équipes de plaquistes et peintres qualifiés dans toute l&apos;Occitanie. Nous intervenons rapidement pour vos projets de rénovation intérieure, de l&apos;isolation à la finition haut de gamme, chez les particuliers et les professionnels.
            </p>
          </R>
          <R delay={150}>
            <h3 className={s.expTitle} style={{ marginBottom: '1rem' }}>Principales villes desservies</h3>
            <ul className={s.zoneList}>
              {[
                'Toulouse', 'Colomiers', 'Tournefeuille', 'Muret', 'Blagnac', 
                'Plaisance-du-Touch', 'Cugnaux', 'Balma', 'L\'Union', 'Ramonville-Saint-Agne', 
                'Castanet-Tolosan', 'Saint-Orens-de-Gameville', 'Saint-Jean', 'Portet-sur-Garonne', 
                'Léguevin', 'Fonsorbes', 'Castelginest', 'Auterive', 'Frouzins', 'Labège'
              ].map(city => (
                <li key={city} className={s.zoneCity}>
                  <Link href="/contact" aria-label={`Rénovation et plaquiste à ${city}`}>{city}</Link>
                </li>
              ))}
            </ul>
          </R>
        </div>
      </section>

      <section className={s.testims}>
        <R cls={s.testimHead}>
          <p className={s.label}>Témoignages</p>
          <h2 className={s.h2}>Ce que disent<br />nos clients.</h2>
        </R>
        <div className={s.testimGrid}>
          {[
            { q: 'Chantier impeccable. Les finitions sont d\'une précision remarquable. L\'équipe est sérieuse, ponctuelle et laisse les lieux propres après chaque journée de travail.', name: 'Sophie M.', role: 'Propriétaire — Toulouse' },
            { q: 'Je confie systématiquement mes chantiers de rénovation à REONOVA depuis 3 ans. Fiabilité, respect des délais et qualité d\'exécution irréprochable. Un partenaire de confiance.', name: 'Marc D.', role: 'Promoteur immobilier' },
            { q: 'La maîtrise technique de l\'équipe est vraiment au-dessus de la moyenne. Mes clients architectes et moi-même sommes toujours très satisfaits de la qualité des finitions.', name: 'Isabelle T.', role: 'Architecte d\'intérieur' },
          ].map((t, i) => (
            <R key={t.name} delay={i * 100} cls={s.testimCard}>
              <div className={s.testimQ}>&ldquo;{t.q}&rdquo;</div>
              <div className={s.testimBy}>
                <div className={s.testimLine} />
                <div>
                  <p className={s.testimName}>{t.name}</p>
                  <p className={s.testimRole}>{t.role}</p>
                </div>
              </div>
            </R>
          ))}
        </div>
      </section>
    </>
  );
}
