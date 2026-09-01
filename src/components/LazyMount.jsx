'use client';

import { useEffect, useRef, useState } from 'react';

export default function LazyMount({ children, eager = false, minHeight = 420 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(eager);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: '280px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [show]);

  return (
    <div ref={ref}>
      {show ? children : <div className="lazy-placeholder" style={{ minHeight }} />}
    </div>
  );
}
