import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SwipeableViews from 'react-swipeable-views';
import './Atsmosphere.css';
import fatcat from '../fat-cat.png';

const importImage = async ({imageId}) => {
  const image = await import(`../album/atsmosphere/${imageId}.png`);
  return image.default;
};
function Atsmosphere () {
  const [images, setImages] = useState([]);

  useEffect(() => {
      async function loadImages() {
          const imageIds = ['ats1', 'ats2', 'ats3','ats4','ats5','ats6','ats7','ats8','ats9','ats10','ats11','ats12']; 
          const imagePromises = imageIds.map(id => importImage({ imageId: id }));
          const loadedImages = await Promise.all(imagePromises);
          setImages(loadedImages.filter(image => image !== null)); 
      }
      loadImages();
  }, []);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [imagesPerFrame, setImagesPerFrame] = useState(3);
  const { t } = useTranslation();


  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 650) {
        setImagesPerFrame(1);
      } else if (screenWidth <= 900) { 
        setImagesPerFrame(2);
      } else {
        setImagesPerFrame(3);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChangeIndex = (index) => {
    setCurrentSetIndex(index);
  };

  const handlePrev = () => {
    setCurrentSetIndex((index) => (index - 1 + Math.ceil(images.length / imagesPerFrame)) % Math.ceil(images.length / imagesPerFrame));
  };

  const handleNext = () => {
    setCurrentSetIndex((index) => (index + 1) % Math.ceil(images.length / imagesPerFrame));
  };

  const renderImagesInSet = (setIndex) => {
    const startIndex = setIndex * imagesPerFrame;
    const endIndex = Math.min(startIndex + imagesPerFrame, images.length);

    return images.slice(startIndex, endIndex).map((image, index) => (
      <div key={startIndex + index}>
        <img className='atsmosphere-img-container' src={image} alt={`Image ${startIndex + index + 1}`} />
      </div>
    ));
  };

  const renderImageCircles = () => {
    return [...Array(Math.ceil(images.length / imagesPerFrame)).keys()].map((setIndex) => (
      <span key={setIndex} className={`image-circle ${setIndex === currentSetIndex ? 'active' : ''}`}></span>
    ));
  };

  return (
    <div className="atsmosphere">
      <h1>{t('atsmosphereTitle')}</h1>
      <div className='img-container'>
        {window.innerWidth >= 650 && (
              <div className="button-container">
              <img className="fat-cat" src= {fatcat}/>
              <button className="control-btn"onClick={handlePrev}>&lt;</button>
            </div>
        )}
        <SwipeableViews index={currentSetIndex} onChangeIndex={handleChangeIndex} enableMouseEvents>
          {[...Array(Math.ceil(images.length / imagesPerFrame)).keys()].map((setIndex) => (
            <div className='atsmosphere-img-container' key={setIndex}>
              {renderImagesInSet(setIndex)}
            </div>
          ))}
        </SwipeableViews>
        {window.innerWidth >= 650 && (
              <div className="button-container">
              <img className="fat-cat" src= {fatcat}/>
              <button className="control-btn"onClick={handleNext}>&gt;</button>
            </div>
        )}
      </div>
      <div className="image-circles">
        {renderImageCircles()}
      </div>
    </div>
  );
};

export default Atsmosphere;


