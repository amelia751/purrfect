'use client';

import { useEffect, useRef, useState } from 'react';
import { optimizedImageAttrs } from '@/lib/image';

export default function FadeImage({
  className = '',
  alt = '',
  priority = false,
  onLoad,
  src,
  optimizeWidth = 1200,
  sizes,
  quality,
  fit,
  ...props
}) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(priority);
  const optimized = optimizedImageAttrs(src, {
    width: optimizeWidth,
    sizes,
    quality,
    fit,
  });

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <img
      ref={imgRef}
      className={['fade-img', loaded ? 'is-loaded' : '', className].filter(Boolean).join(' ')}
      alt={alt}
      src={optimized.src}
      srcSet={optimized.srcSet}
      sizes={optimized.sizes}
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
