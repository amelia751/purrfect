import React, { useState, useEffect } from 'react';
import './CatsDetail.css';
import SwipeableViews from 'react-swipeable-views';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import fatcat from './fat-cat.png';

function CatsDetail({ profile, gender, name, species, DOB, images }) {
        const GenderIcon = () => {
            switch(gender) {
              case 'male':
                return <MaleIcon style={{ color: 'navy', transform: 'scale(1.6)'}} />;
              case 'female':
                return <FemaleIcon style={{ color: 'pink', transform: 'scale(1.6)' }} />;
              default:
                return null;
            }
          };
    
        const [currentSetIndex, setCurrentSetIndex] = useState(0);
        const [imagesPerFrame, setImagesPerFrame] = useState(3);  
      
        useEffect(() => {
          const handleResize = () => {
            const screenWidth = window.innerWidth;
      
            if (screenWidth <= 600) {
              setImagesPerFrame(1);
            } else {
              setImagesPerFrame(2);
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
        <div className='cats-detail'>
            <div className='cat-main-profile'>
                <img className="cat-profile" src={profile}></img>
                <h1 className="cat-name">{name}</h1>
                <div className="cat-gender"><GenderIcon /></div>
                <p className="cat-speice">{species}</p>
                <p className="cat-DOB">{DOB}</p>
            </div>
            <div className="cat-gallery">
            <div className='img-container'>
                {window.innerWidth >= 600 && (
                    <div className="button-container">
                    <img className="fat-cat" src= {fatcat}/>
                    <button className="control-btn"onClick={handlePrev}>&lt;</button>
                    </div>
                )}
                <SwipeableViews index={currentSetIndex} onChangeIndex={handleChangeIndex} enableMouseEvents>
                {[...Array(Math.ceil(images.length / imagesPerFrame)).keys()].map((setIndex) => (
                    <div className='gallery-img-container' key={setIndex}>
                    {renderImagesInSet(setIndex)}
                    </div>
                ))}
                </SwipeableViews>
                {window.innerWidth >= 600 && (
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
        </div>
        );
      };
  
export default CatsDetail