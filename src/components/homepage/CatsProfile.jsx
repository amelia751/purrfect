'use client';

import { useEffect, useState } from 'react';
import { localCats } from '@/data/cats';
import { fetchCats } from '@/lib/content';
import { bornLabel, hasCatMeta } from '@/lib/catLabels';
import FadeImage from '../FadeImage';
import GenderMark from '../GenderMark';
import { useReveal } from '../Reveal';
import './CatsProfile.css';

const CatInfo = ({ profile, gender, name, species, DOB, delay = 0 }) => {
  const [ref, revealClass] = useReveal();
  const born = bornLabel(DOB);

  return (
    <div ref={ref} className={`cat-info ${revealClass}`} style={{ '--reveal-delay': `${delay}ms` }}>
      <div className="cat-pics-frame">
        <FadeImage className="cat-pics" src={profile} alt={`${name} profile`} optimizeWidth={560} sizes="280px" fit="cover" />
      </div>
      <h3 className="cat-names">{name}</h3>
      {hasCatMeta(gender, species) ? (
        <p className="cat-speices">
          <GenderMark gender={gender} />
          {species ? <span>{species}</span> : null}
        </p>
      ) : null}
      {born ? <p className="cat-DOBs">{born}</p> : null}
    </div>
  );
};

function CatsProfile() {
  const [cats, setCats] = useState(() => localCats.filter((cat) => cat.showOnHome && cat.status !== 'in_remembrance'));

  useEffect(() => {
    let cancelled = false;
    fetchCats().then((next) => {
      if (!cancelled) setCats(next.filter((cat) => cat.showOnHome && cat.status !== 'in_remembrance'));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="cats-profiles">
      {cats.map((cat, index) => (
        <CatInfo
          key={cat.id}
          profile={cat.profileUrl}
          gender={cat.gender}
          name={cat.fullname}
          species={cat.species}
          DOB={cat.dob}
          delay={index * 70}
        />
      ))}
    </div>
  );
}

export default CatsProfile;
