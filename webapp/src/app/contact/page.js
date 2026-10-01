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
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', msg: '' });

  const submit = e => { e.preventDefault(); setSent(true); };
  const set = k => e => setForm({ ...form, [k]: e.target.value });

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
                <span className={s.cDetailVal}>06 XX XX XX XX</span>
              </div>
              <div className={s.cDetail}>
                <span className={s.cDetailKey}>Email</span>
                <span className={s.cDetailVal}>contact@reonova.fr</span>
              </div>
              <div className={s.cDetail}>
                <span className={s.cDetailKey}>Zone</span>
                <span className={s.cDetailVal}>Toulouse & Occitanie</span>
              </div>
            </div>
          </R>
        </div>

        <div className={s.contactR}>
          <R>
            {sent ? (
              <div className={s.sent}>
                <div className={s.sentIcon}>✓</div>
                <h3 className={s.sentTitle}>Message envoyé</h3>
                <p className={s.sentTxt}>Nous reviendrons vers vous sous 48 heures.</p>
              </div>
            ) : (
              <form onSubmit={submit} className={s.form}>
                <h3 className={s.formTitle}>Demande de devis gratuit</h3>
                <div className={s.formRow}>
                  <div className={s.fg}>
                    <label className={s.flabel} htmlFor="f-name">Nom complet *</label>
                    <input id="f-name" required type="text" placeholder="Jean Dupont" className={s.fi} value={form.name} onChange={set('name')} />
                  </div>
                  <div className={s.fg}>
                    <label className={s.flabel} htmlFor="f-phone">Téléphone *</label>
                    <input id="f-phone" required type="tel" placeholder="06 00 00 00 00" className={s.fi} value={form.phone} onChange={set('phone')} />
                  </div>
                </div>
                <div className={s.fg}>
                  <label className={s.flabel} htmlFor="f-email">Email *</label>
                  <input id="f-email" required type="email" placeholder="jean@email.com" className={s.fi} value={form.email} onChange={set('email')} />
                </div>
                <div className={s.fg}>
                  <label className={s.flabel} htmlFor="f-service">Prestation</label>
                  <select id="f-service" className={s.fi} value={form.service} onChange={set('service')}>
                    <option value="">Sélectionner…</option>
                    <option>Plaquisterie</option>
                    <option>Jointure & Enduits</option>
                    <option>Peinture</option>
                    <option>Rénovation complète</option>
                  </select>
                </div>
                <div className={s.fg}>
                  <label className={s.flabel} htmlFor="f-msg">Votre projet *</label>
                  <textarea id="f-msg" required rows={4} placeholder="Surface, nature des travaux, délais envisagés…" className={`${s.fi} ${s.ta}`} value={form.msg} onChange={set('msg')} />
                </div>
                <button type="submit" id="contact-submit" className={s.btnSubmit}>
                  Envoyer la demande
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </form>
            )}
          </R>
        </div>
      </section>
    </div>
  );
}
