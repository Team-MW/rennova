'use client';
import { useEffect, useRef, useState } from 'react';
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


export default function Contact() {
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    const handleMessage = (e) => {
      if (typeof e.data === 'string') {
        const args = e.data.split(':');
        if (args.length > 2) {
          const iframe = document.getElementById('JotFormIFrame-' + args[args.length - 1]);
          if (iframe && args[0] === 'setHeight') {
            iframe.style.height = args[1] + 'px';
          }
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (window.location.hash === '#devis') {
      setTimeout(() => {
        const el = document.getElementById('devis');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  return (
    <div style={{ paddingTop: '72px' }}>
      <section className={s.contact}>
        <div className={s.contactL}>
          <R>
            <p className={s.labelWhite}>Contact</p>
            <h1 className={s.h2White}>Parlons de<br />votre projet.</h1>
            <p className={s.bodyWhite}>
              Nous vous répondons dans les 48 heures avec un devis détaillé et transparent, sans engagement.
            </p>
            <div className={s.contactDetails}>
              <div className={s.cDetail}>
                <span className={s.cDetailKey}>Téléphone</span>
                <a href="tel:+33767021944" className={s.cDetailVal} style={{ textDecoration: 'none' }}>07 67 02 19 44</a>
              </div>
              <div className={s.cDetail}>
                <span className={s.cDetailKey}>Email</span>
                <a href="mailto:contact@renova.fr" className={s.cDetailVal} style={{ textDecoration: 'none' }}>contact@renova.fr</a>
              </div>
              <div className={s.cDetail}>
                <span className={s.cDetailKey}>Zone</span>
                <span className={s.cDetailVal}>Toulouse & Occitanie</span>
              </div>
            </div>
          </R>
        </div>

        <div className={s.contactR} id="devis">
          <R cls={s.iframeWrapper}>
            {!formLoaded && (
              <div className={s.formLoader}>
                <div className={s.spinner}></div>
                <p>Chargement du formulaire...</p>
              </div>
            )}
            <iframe
              id="JotFormIFrame-262733401318350"
              title="Devis Gratuit RENOVA"
              onLoad={() => setFormLoaded(true)}
              allowtransparency="true"
              allowFullScreen={true}
              allow="geolocation; microphone; camera"
              src="https://form.jotform.com/262733401318350"
              frameBorder="0"
              style={{ 
                minWidth: '100%', 
                height: formLoaded ? '800px' : '0', 
                border: 'none',
                opacity: formLoaded ? 1 : 0,
                transition: 'opacity 0.4s ease'
              }}
              scrolling="no"
            />
          </R>
        </div>
      </section>
    </div>
  );
}
