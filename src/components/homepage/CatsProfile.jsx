'use client';

import { useEffect, useState } from 'react';
import { localCats } from '@/data/cats';
import { fetchCats } from '@/lib/content';
import { bornLabel, catMetaItems } from '@/lib/catLabels';
import FadeImage from '../FadeImage';
import { useReveal } from '../Reveal';
import './CatsProfile.css';

const CatInfo = ({ profile, gender, name, species, DOB, delay = 0 }) => {
  const [ref, revealClass] = useReveal();
  const meta = catMetaItems(gender, species);
  const born = bornLabel(DOB);

  return (
    <div ref={ref} className={`cat-info ${revealClass}`} style={{ '--reveal-delay': `${delay}ms` }}>
      <div className="cat-pics-frame">
        <FadeImage className="cat-pics" src={profile} alt={`${name} profile`} optimizeWidth={560} sizes="280px" fit="cover" />
      </div>
      <h3 className="cat-names">{name}</h3>
      {meta.length ? (
        <p className="cat-speices">
          {meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </p>
      ) : null}
      {born ? <p className="cat-DOBs">{born}</p> : null}
    </div>
  );
};

function CatsProfile() {
  const [cats, setCats] = useState(localCats);

  useEffect(() => {
    let cancelled = false;
    fetchCats().then((next) => {
      if (!cancelled) setCats(next.filter((cat) => cat.showOnHome));
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
