'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import s from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  const isSolid = solid || pathname !== '/';

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    // Trigger once on load
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`${s.header} ${isSolid ? s.solid : ''}`}>
      <div className={s.inner}>
        <Link href="/" className={s.logo}>
          <Image src="/logo-icon.jpg" alt="RENOVA" width={36} height={36} className={s.logoMark} priority />
          <span className={s.logoName}>RENOVA</span>
        </Link>

        <nav className={s.nav}>
          <Link href="/expertise" className={s.link}>Expertise</Link>
          <Link href="/realisations" className={s.link}>Réalisations</Link>
          <Link href="/a-propos" className={s.link}>À Propos</Link>
          <Link href="/contact" className={s.link}>Contact</Link>
        </nav>

        <a href="/contact#devis" className={s.cta}>
          Devis Gratuit
        </a>

        <button className={`${s.burger} ${open ? s.burgerOpen : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span />
        </button>
      </div>

      <div className={`${s.mobile} ${open ? s.mobileOpen : ''}`}>
        <Link href="/expertise" className={s.mobileLink} onClick={() => setOpen(false)}>Expertise</Link>
        <Link href="/realisations" className={s.mobileLink} onClick={() => setOpen(false)}>Réalisations</Link>
        <Link href="/a-propos" className={s.mobileLink} onClick={() => setOpen(false)}>À Propos</Link>
        <Link href="/contact" className={s.mobileLink} onClick={() => setOpen(false)}>Contact</Link>
        <a href="/contact#devis" className={s.mobileCta} onClick={() => setOpen(false)}>Devis Gratuit</a>
      </div>
    </header>
  );
}
