'use client';
import s from '../shared.module.css';

export default function MentionsLegales() {
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--pearl, #f8f9fa)' }}>
      <section className={s.real} style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
        <div className={s.realHead} style={{ textAlign: 'left', marginBottom: '2rem' }}>
          <p className={s.label}>Informations juridiques</p>
          <h1 className={s.h2}>Mentions Légales</h1>
        </div>

        <div className={s.body} style={{ background: '#fff', padding: '3rem', borderRadius: '4px', border: '1px solid var(--line, #e5e5e5)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--ink)' }}>Éditeur du site</h2>
          <p style={{ marginBottom: '0.5rem' }}><strong>MONSIEUR LAHOUARI NEHBI (RENOVA)</strong></p>
          <p style={{ marginBottom: '0.5rem' }}>Entrepreneur individuel</p>
          <p style={{ marginBottom: '0.5rem' }}><strong>Adresse :</strong> 31 RUE PARGAMINIERES, 31000 TOULOUSE</p>
          <p style={{ marginBottom: '2rem' }}><strong>Dirigeant :</strong> Lahouari NEHBI</p>

          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--ink)' }}>Informations de l&apos;entreprise</h2>
          <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '2rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>SIREN :</strong> 530 751 981</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>SIRET :</strong> 530 751 981 00024</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Numéro de TVA :</strong> FR82530751981</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Date de création :</strong> 23 avril 2026</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Activité (NAF / APE) :</strong> Travaux de plâtrerie - 4331Z</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--ink)' }}>Création & Hébergement</h2>
          <p style={{ marginBottom: '0.5rem' }}>Site internet réalisé par <strong><a href="https://microdidact.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Microdidact</a></strong>.</p>
          <p style={{ marginBottom: '0.5rem' }}>Hébergement assuré par Vercel Inc. (ou hébergeur actuel).</p>
        </div>
      </section>
    </div>
  );
}
