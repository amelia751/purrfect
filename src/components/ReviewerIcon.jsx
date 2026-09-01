const FACES = [
  { bg: '#f3cfce', fur: '#756659', mood: 'blush' },
  { bg: '#fbf2f2', fur: '#c48b78', mood: 'default' },
  { bg: '#efe4dc', fur: '#756659', mood: 'sleepy' },
  { bg: '#f7e6e6', fur: '#c48b78', mood: 'default' },
  { bg: '#f3cfce', fur: '#c9a27c', mood: 'blush' },
  { bg: '#efe4dc', fur: '#5f534b', mood: 'default' },
];

function CatFace({ fur, mood }) {
  return (
    <g>
      <path d="M12.8 16.2 9.6 9.4 17.6 13.8z" fill={fur} />
      <path d="M27.2 16.2 30.4 9.4 22.4 13.8z" fill={fur} />
      <ellipse cx="20" cy="22.2" rx="11.2" ry="10.4" fill={fur} />
      {mood === 'sleepy' ? (
        <>
          <path d="M14.2 21.8c1.7 1.2 3.6 1.2 5.3 0" fill="none" stroke="#fff8f4" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M20.5 21.8c1.7 1.2 3.6 1.2 5.3 0" fill="none" stroke="#fff8f4" strokeWidth="1.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="16.2" cy="21.2" r="1.45" fill="#fff8f4" />
          <circle cx="23.8" cy="21.2" r="1.45" fill="#fff8f4" />
          <circle cx="16.45" cy="21.4" r="0.6" fill="#3a2f2a" />
          <circle cx="24.05" cy="21.4" r="0.6" fill="#3a2f2a" />
        </>
      )}
      <circle cx="20" cy="23.4" r="0.55" fill="#3a2f2a" />
      <path d="M17.3 24.2c1.6 1.35 3.8 1.35 5.4 0" fill="none" stroke="#3a2f2a" strokeWidth="0.75" strokeLinecap="round" />
      {mood === 'blush' && (
        <>
          <ellipse cx="14.3" cy="24.8" rx="1.7" ry="0.85" fill="#f3cfce" />
          <ellipse cx="25.7" cy="24.8" rx="1.7" ry="0.85" fill="#f3cfce" />
        </>
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
