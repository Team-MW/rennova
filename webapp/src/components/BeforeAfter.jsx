'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import s from './BeforeAfter.module.css';

export default function BeforeAfter({ before, after, title, place, large = false, priority = false }) {
  const stageRef = useRef(null);
  const [pos, setPos] = useState(54);

  const moveTo = (clientX) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(94, Math.max(6, next)));
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setPos((value) => Math.max(6, value - 4));
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setPos((value) => Math.min(94, value + 4));
    }
  };

  return (
    <figure className={`${s.card} ${large ? s.large : ''}`}>
      <div
        ref={stageRef}
        className={s.stage}
        style={{ '--reveal': `${pos}%` }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          moveTo(event.clientX);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) moveTo(event.clientX);
        }}
      >
        <Image
          src={after}
          alt={`${title}, après`}
          fill
          sizes={large ? '(max-width: 900px) 100vw, 1200px' : '(max-width: 900px) 90vw, 50vw'}
          style={{ objectFit: 'cover' }}
          priority={priority}
          draggable={false}
        />
        <div className={s.before}>
          <Image
            src={before}
            alt={`${title}, avant`}
            fill
            sizes={large ? '(max-width: 900px) 100vw, 1200px' : '(max-width: 900px) 90vw, 50vw'}
            style={{ objectFit: 'cover' }}
            draggable={false}
          />
        </div>
        <span className={s.pillLeft}>Avant</span>
        <span className={s.pillRight}>Après</span>
        <div
          className={s.handle}
          role="slider"
          tabIndex={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-label={`Comparer avant et après : ${title}`}
          onKeyDown={onKeyDown}
        >
          <span className={s.knob} aria-hidden="true">↔</span>
        </div>
      </div>
      <figcaption className={s.caption}>
        <h3>{title}</h3>
        <p>{place}</p>
      </figcaption>
    </figure>
  );
}
