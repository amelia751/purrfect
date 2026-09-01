const WIDTH_STEPS = [320, 480, 640, 768, 960, 1200, 1600, 1920];

export function shouldOptimizeImages() {
  return process.env.NODE_ENV === 'production';
}

export function optimizedImageUrl(src, width, quality = 75, fit = 'contain') {
  if (!src || !shouldOptimizeImages()) return src;

  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality),
    fit: fit === 'cover' ? 'contain' : (fit || 'contain'),
  });

  return `/.netlify/images?${params}`;
}

export function optimizedImageAttrs(src, { width = 1200, sizes, quality = 75, fit = 'contain' } = {}) {
  if (!src || !shouldOptimizeImages()) {
    return { src };
  }

  const steps = [...new Set([...WIDTH_STEPS.filter((step) => step <= width), width])]
    .sort((a, b) => a - b);
  const srcSet = steps
    .map((step) => `${optimizedImageUrl(src, step, quality, fit)} ${step}w`)
    .join(', ');

  return {
    src: optimizedImageUrl(src, width, quality, fit),
    srcSet,
    sizes: sizes || `(max-width: ${width}px) 100vw, ${width}px`,
  };
}
