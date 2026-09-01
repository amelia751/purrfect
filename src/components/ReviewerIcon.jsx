const FACES = [
  { bg: '#f3cfce', fur: '#756659', mood: 'blush' },
  { bg: '#fbf2f2', fur: '#c48b78', mood: 'default' },
  { bg: '#efe4dc', fur: '#756659', mood: 'sleepy' },
  { bg: '#f3cfce', fur: '#8a6a5a', mood: 'heart' },
  { bg: '#f7e6e6', fur: '#c9a27c', mood: 'blush' },
  { bg: '#efe4dc', fur: '#5f534b', mood: 'default' },
];

function CatFace({ fur, mood }) {
  return (
    <g>
      <path d="M10 17.5 6.2 8.2 17 14z" fill={fur} />
      <path d="M30 17.5 33.8 8.2 23 14z" fill={fur} />
      <ellipse cx="20" cy="23" rx="13" ry="12" fill={fur} />
      {mood === 'sleepy' ? (
        <>
          <path d="M13.2 22.4c2 1.4 4.2 1.4 6.2 0" fill="none" stroke="#fff8f4" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M20.6 22.4c2 1.4 4.2 1.4 6.2 0" fill="none" stroke="#fff8f4" strokeWidth="1.3" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="15.4" cy="21.6" r="1.7" fill="#fff8f4" />
          <circle cx="24.6" cy="21.6" r="1.7" fill="#fff8f4" />
          <circle cx="15.7" cy="21.8" r="0.7" fill="#3a2f2a" />
          <circle cx="24.9" cy="21.8" r="0.7" fill="#3a2f2a" />
        </>
      )}
      <circle cx="20" cy="24.4" r="0.7" fill="#3a2f2a" />
      <path d="M20 24.7c1 .9 2.1.9 3.1 0" fill="none" stroke="#3a2f2a" strokeWidth="0.85" strokeLinecap="round" />
      {mood === 'blush' && (
        <>
          <ellipse cx="13.4" cy="25.8" rx="2" ry="1" fill="#f3cfce" />
          <ellipse cx="26.6" cy="25.8" rx="2" ry="1" fill="#f3cfce" />
        </>
      )}
      {mood === 'heart' && (
        <path d="M29.8 11.6c0-1.3 1-2.1 2.1-2.1s2.1.8 2.1 2.1c0 2.1-4.2 3.9-4.2 3.9s-4.2-1.8-4.2-3.9c0-1.3 1-2.1 2.1-2.1s2.1.8 2.1 2.1z" fill="#f3cfce" />
      )}
    </g>
  );
}

export default function ReviewerIcon({ index = 0, className = '' }) {
  const face = FACES[index % FACES.length];

  return (
    <span className={`reviewer-icon ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 40 40" width="50" height="50" role="presentation">
        <circle cx="20" cy="20" r="20" fill={face.bg} />
        <CatFace fur={face.fur} mood={face.mood} />
      </svg>
    </span>
  );
}
