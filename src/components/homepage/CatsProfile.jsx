'use client';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { homepageCats } from '@/data/cats';
import './CatsProfile.css';

const CatInfo = ({ profile, gender, name, speice, DOB }) => {
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
    <div className="cat-info">
      <img className="cat-pics" src={profile} alt={`${name} profile`} />
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
      {homepageCats.map((cat) => (
        <CatInfo key={cat.name} {...cat} />
      ))}
    </div>
  );
}

export default CatsProfile;
