'use client';
import Link from 'next/link';
import Image from 'next/image';
import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <div className={s.footerBrand}>
          <Image src="/logo-full.png" alt="RENOVA" width={200} height={60} style={{ height: 'auto', width: 'auto', maxHeight: 48 }} />
          <p className={s.footerTagline}>Jointure · Plaquisterie · Peinture · Rénovation</p>
        </div>
        <div className={s.footerLinks}>
          <div className={s.footerCol}>
            <p className={s.footerColH}>Navigation</p>
            <Link href="/expertise" className={s.fl}>Expertise</Link>
            <Link href="/realisations" className={s.fl}>Réalisations</Link>
            <Link href="/a-propos" className={s.fl}>À Propos</Link>
            <Link href="/contact" className={s.fl}>Contact</Link>
          </div>
          <div className={s.footerCol}>
            <p className={s.footerColH}>Coordonnées</p>
            <span className={s.fl}>07 67 02 19 44</span>
            <span className={s.fl}>contact@renova.fr</span>
            <span className={s.fl}>Toulouse, Occitanie</span>
          </div>
        </div>
      </div>
      <div className={s.footerBottom}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span>© {new Date().getFullYear()} RENOVA. Tous droits réservés.</span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.65rem' }}>
            Réalisé par <a href="https://microdidact.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Microdidact</a>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/mentions-legales" className={s.fbl}>Mentions légales</Link>
          <Link href="/mentions-legales" className={s.fbl}>Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
