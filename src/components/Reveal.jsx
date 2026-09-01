'use client';

import { useEffect, useRef, useState } from 'react';

export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.01, rootMargin: '80px 0px' },
    );

    observer.observe(el);
    const fallback = window.setTimeout(() => setVisible(true), 900);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return [ref, `reveal${visible ? ' is-visible' : ''}`];
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  style,
  ...props
}) {
  const [ref, revealClass] = useReveal();

  return (
    <Tag
      ref={ref}
      className={[revealClass, className].filter(Boolean).join(' ')}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
