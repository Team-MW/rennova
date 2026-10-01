'use client';
import { useState, useEffect } from 'react';
import s from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000); // Reste visible 3 secondes
    }, 8000); // Déclenchement toutes les 8 secondes (5s de pause + 3s visible)

    return () => clearInterval(interval);
  }, []);

  const phone = '33767021944';
  const msg = encodeURIComponent("Bonjour REONOVA, je souhaite vous contacter au sujet d'un projet de rénovation.");
  
  return (
    <div className={s.wrapper}>
      <div className={`${s.tooltip} ${showTooltip ? s.showTooltip : ''}`}>
        Contactez-nous 👋
      </div>
      <a 
        href={`https://wa.me/${phone}?text=${msg}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={s.waButton}
        aria-label="Discuter sur WhatsApp"
      >
      <svg className={s.waIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.031 0C5.389 0 0 5.39 0 12.031c0 2.12.548 4.195 1.59 6.012L.039 24l6.104-1.603c1.745.96 3.707 1.467 5.753 1.467h.004c6.64 0 12.031-5.389 12.031-12.031C23.931 5.39 18.541 0 11.9 0h.131zm0 21.848c-1.802 0-3.57-.482-5.116-1.396l-.367-.217-3.805.998.998-3.712-.238-.38c-.997-1.583-1.523-3.415-1.523-5.283 0-5.467 4.453-9.92 9.922-9.92s9.92 4.453 9.92 9.92-4.453 9.92-9.92 9.92h-.001zm5.447-7.433c-.298-.15-1.767-.872-2.04-.972-.272-.1-.47-.15-.67.15-.198.297-.768.972-.942 1.17-.174.198-.348.223-.646.075-.298-.15-1.26-.465-2.4-1.485-.885-.794-1.485-1.77-1.66-2.068-.174-.298-.018-.46.13-.61.135-.135.298-.347.447-.52.148-.174.198-.298.297-.497.1-.198.05-.373-.025-.52-.074-.15-.67-1.615-.917-2.212-.24-.582-.486-.503-.67-.512-.174-.01-.374-.01-.572-.01-.198 0-.52.074-.794.372-.272.298-1.042 1.018-1.042 2.482s1.066 2.876 1.215 3.076c.15.198 2.095 3.2 5.074 4.485.71.306 1.264.49 1.694.627.712.226 1.36.194 1.872.117.574-.085 1.767-.723 2.016-1.42.247-.698.247-1.296.173-1.42-.074-.124-.272-.198-.57-.348z" />
      </svg>
    </a>
    </div>
  );
}
