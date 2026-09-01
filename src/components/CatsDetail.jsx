'use client';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ImageCarousel from './ImageCarousel';
import './CatsDetail.css';
import './homepage/Atsmosphere.css';

function CatsDetail({ profile, gender, name, species, DOB, images }) {
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
    <div className="cats-detail">
      <div className="cat-main-profile">
        <img className="cat-profile" src={profile} alt={name} />
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
          imageClassName="atsmosphere-img-container"
          getImagesPerFrame={(screenWidth) => (screenWidth <= 600 ? 1 : 2)}
        />
      </div>
    </div>
  );
}

export default CatsDetail;
