'use client';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { homepageCats } from '@/data/cats';
import FadeImage from '../FadeImage';
import { useReveal } from '../Reveal';
import './CatsProfile.css';

const CatInfo = ({ profile, gender, name, speice, DOB, delay = 0 }) => {
  const [ref, revealClass] = useReveal();
  const GenderIcon = () => {
    switch (gender) {
      case 'male':
        return <MaleIcon style={{ color: 'navy', transform: 'scale(1.6)' }} />;
      case 'female':
        return <FemaleIcon style={{ color: 'pink', transform: 'scale(1.6)' }} />;
      default:
        return null;
    }
  };

  return (
    <div ref={ref} className={`cat-info ${revealClass}`} style={{ '--reveal-delay': `${delay}ms` }}>
      <FadeImage className="cat-pics" src={profile} alt={`${name} profile`} />
      <h1 className="cat-names">{name}</h1>
      <div className="cat-genders"><GenderIcon /></div>
      <p className="cat-speices">{speice}</p>
      <p className="cat-DOBs">{DOB}</p>
    </div>
  );
};

function CatsProfile() {
  return (
    <div className="cats-profiles">
      {homepageCats.map((cat, index) => (
        <CatInfo key={cat.name} {...cat} delay={index * 70} />
      ))}
    </div>
  );
}

export default CatsProfile;
