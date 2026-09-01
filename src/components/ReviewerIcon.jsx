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
    <g fill={fur}>
      <ellipse cx="20" cy="22" rx="11" ry="10" />
      <path d="M11.5 16.5 8 9.5 16 13.5z" />
      <path d="M28.5 16.5 32 9.5 24 13.5z" />
      {mood === 'sleepy' ? (
        <>
          <path d="M14.6 21.4c1.4.9 2.8.9 4.2 0" fill="none" stroke="#3a2f2a" strokeWidth="0.85" strokeLinecap="round" />
          <path d="M21.2 21.4c1.4.9 2.8.9 4.2 0" fill="none" stroke="#3a2f2a" strokeWidth="0.85" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="16.4" cy="21.2" r="1.15" fill="#fff" />
          <circle cx="23.6" cy="21.2" r="1.15" fill="#fff" />
          <circle cx="16.6" cy="21.4" r="0.55" fill="#3a2f2a" />
          <circle cx="23.8" cy="21.4" r="0.55" fill="#3a2f2a" />
        </>
      )}
      <circle cx="20" cy="23" r="0.45" fill="#3a2f2a" />
      <path d="M20 23.2c.7.7 1.5.7 2.2 0" fill="none" stroke="#3a2f2a" strokeWidth="0.7" strokeLinecap="round" />
      {mood === 'blush' && (
        <>
          <ellipse cx="14.2" cy="24.4" rx="1.5" ry="0.8" fill="#f3cfce" opacity="0.9" />
          <ellipse cx="25.8" cy="24.4" rx="1.5" ry="0.8" fill="#f3cfce" opacity="0.9" />
        </>
      )}
      {mood === 'heart' && (
        <path d="M31.2 12.2c0-1.1.9-1.8 1.8-1.8s1.8.7 1.8 1.8c0 1.8-3.6 3.4-3.6 3.4S31.2 14 31.2 12.2z" fill="#f3cfce" />
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
