'use client';
import Link from 'next/link';
import Image from 'next/image';
import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <div className={s.footerBrand}>
          <Image src="/logo-full.png" alt="REONOVA" width={200} height={60} style={{ height: 'auto', width: 'auto', maxHeight: 48 }} />
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
            <span className={s.fl}>06 XX XX XX XX</span>
            <span className={s.fl}>contact@reonova.fr</span>
            <span className={s.fl}>Toulouse, Occitanie</span>
          </div>
        </div>
      </div>
      <div className={s.footerBottom}>
        <span>© {new Date().getFullYear()} REONOVA. Tous droits réservés.</span>
        <div>
          <Link href="#" className={s.fbl}>Mentions légales</Link>
          <Link href="#" className={s.fbl}>Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
