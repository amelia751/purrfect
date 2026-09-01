'use client';

import { useEffect, useRef, useState } from 'react';

export default function FadeImage({
  className = '',
  alt = '',
  priority = false,
  onLoad,
  ...props
}) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(priority);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [props.src]);

  return (
    <img
      ref={imgRef}
      className={['fade-img', loaded ? 'is-loaded' : '', className].filter(Boolean).join(' ')}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      {...props}
    />
  );
}
