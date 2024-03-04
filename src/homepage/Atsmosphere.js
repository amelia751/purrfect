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

      // Adjust the number of images per frame based on screen width
      if (screenWidth <= 650) {
        setImagesPerFrame(1);
      } else if (screenWidth <= 900) { // Add this condition for screen widths 601px to 900px
        setImagesPerFrame(2);
      } else {
        setImagesPerFrame(3);
      }
    };

    // Set initial number of images per frame on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
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


// import React, { useState } from 'react';
// import SwipeableViews from 'react-swipeable-views';
// import './Atsmosphere.css';
// import img1 from './album/ats1.png';
// import img2 from './album/ats2.png';
// import img3 from './album/ats3.png';
// import img4 from './album/ats4.png';
// import img5 from './album/ats5.png';
// import img6 from './album/ats6.png';
// import img7 from './album/ats7.png';
// import img8 from './album/ats8.png';
// import img9 from './album/ats9.png';
// import img10 from './album/ats10.png';
// import img11 from './album/ats11.png';
// import img12 from './album/ats12.png';

// export default function Atsmosphere() {
//   const images = [img1, img2, img3, img4,img5,img6,img7,img8,img9,img10,img11,img12];
//   const [currentSetIndex, setCurrentSetIndex] = useState(0);

//   const handleChangeIndex = (index) => {
//     setCurrentSetIndex(index);
//   };

//   const handlePrev = () => {
//     setCurrentSetIndex((index) => (index - 1 + Math.ceil(images.length / 3)) % Math.ceil(images.length / 3));
//   };

//   const handleNext = () => {
//     setCurrentSetIndex((index) => (index + 1) % Math.ceil(images.length / 3));
//   };


//   const renderImagesInSet = (setIndex) => {
//     const startIndex = setIndex * 3;
//     const endIndex = Math.min(startIndex + 3, images.length);

//     return images.slice(startIndex, endIndex).map((image, index) => (
//       <div key={startIndex + index}>
//         <img className='atsmosphere-img-container' src={image} alt={`Image ${startIndex + index + 1}`} />
//       </div>
//     ));
//   };

//   const renderImageCircles = () => {
//     return [...Array(Math.ceil(images.length / 3)).keys()].map((setIndex) => (
//       <span key={setIndex} className={`image-circle ${setIndex === currentSetIndex ? 'active' : ''}`}></span>
//     ));
//   };

//   return (
//     <div className="atsmosphere">
//       <h1>Atmosphere of our shop</h1>
//       <div className='img-container'>
//         <button className="control__btn" onClick={handlePrev}>Previous</button>
//           <SwipeableViews index={currentSetIndex} onChangeIndex={handleChangeIndex} enableMouseEvents>
//            {[...Array(Math.ceil(images.length / 3)).keys()].map((setIndex) => (
//             <div className='atsmosphere-img-container' key={setIndex}>
//               {renderImagesInSet(setIndex)}
//             </div>
//           ))}
//         </SwipeableViews>
//         <button className="control__btn" onClick={handleNext}>Next</button>
//       </div>
//       <div className="image-circles">
//         {renderImageCircles()}
//       </div>
//     </div>
//   );
// }

