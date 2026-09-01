'use client';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ImageCarousel from './ImageCarousel';
import FadeImage from './FadeImage';
import { useReveal } from './Reveal';
import './CatsDetail.css';
import './homepage/Atsmosphere.css';

function CatsDetail({ profile, gender, name, species, DOB, images }) {
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
    <div ref={ref} className={`cats-detail ${revealClass}`}>
      <div className="cat-main-profile">
        <FadeImage className="cat-profile" src={profile} alt={name} optimizeWidth={560} sizes="280px" fit="cover" />
        <h1 className="cat-name">{name}</h1>
        <div className="cat-gender"><GenderIcon /></div>
        <p className="cat-speice">{species}</p>
        <p className="cat-DOB">{DOB}</p>
      </div>
      <div className="cat-gallery">
        <ImageCarousel
          images={images}
          showButtonsMinWidth={600}
          frameClassName="gallery-img-container"
          imageClassName="gallery-img"
          getImagesPerFrame={(screenWidth) => (screenWidth <= 800 ? 1 : 2)}
        />
      </div>
    </div>
  );
}

export default CatsDetail;
