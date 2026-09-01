'use client';

import ImageCarousel from './ImageCarousel';
import FadeImage from './FadeImage';
import GenderMark from './GenderMark';
import { useReveal } from './Reveal';
import { bornLabel, hasCatMeta } from '@/lib/catLabels';
import './CatsDetail.css';

function CatsDetail({ profile, gender, name, species, DOB, images, stripe = 'odd', priority = false }) {
  const [ref, revealClass] = useReveal();
  const born = bornLabel(DOB);

  return (
    <article ref={ref} className={`cats-detail is-${stripe} ${revealClass}`}>
      <div className="cat-main-profile">
        <div className="cat-profile-frame">
          <FadeImage className="cat-profile" src={profile} alt={name} optimizeWidth={560} sizes="280px" fit="cover" priority={priority} />
        </div>
        <div className="cat-copy">
          <h2 className="cat-name">{name}</h2>
          {hasCatMeta(gender, species) ? (
            <p className="cat-meta">
              <GenderMark gender={gender} />
              {species ? <span>{species}</span> : null}
            </p>
          ) : null}
          {born ? <p className="cat-dob">{born}</p> : null}
        </div>
      </div>
      {images?.length ? (
        <div className="cat-gallery">
          <ImageCarousel
            images={images}
            showButtonsMinWidth={720}
            frameClassName="gallery-img-container"
            imageClassName="gallery-img"
            getImagesPerFrame={(galleryWidth) => (galleryWidth <= 680 ? 1 : 2)}
          />
        </div>
      ) : null}
    </article>
  );
}

export default CatsDetail;
