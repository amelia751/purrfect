'use client';

import { useEffect, useRef, useState } from 'react';
import FadeImage from './FadeImage';
import './ImageCarousel.css';

export default function ImageCarousel({
  images,
  getImagesPerFrame,
  showButtonsMinWidth = 650,
  frameClassName,
  imageClassName,
  optimizeWidth = 900,
  sizes = '(max-width: 800px) 92vw, 38vw',
}) {
  const [width, setWidth] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const dragStartX = useRef(null);
  const rowRef = useRef(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return undefined;

    const updateWidth = () => {
      const next = el.clientWidth || window.innerWidth;
      setWidth(next);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const imagesPerFrame = getImagesPerFrame(width);
  const setCount = Math.max(1, Math.ceil((images.length || 0) / imagesPerFrame));

  useEffect(() => {
    setCurrentSetIndex((index) => (index >= setCount ? 0 : index));
  }, [setCount]);

  const handlePrev = () => {
    setCurrentSetIndex((index) => (index - 1 + setCount) % setCount);
  };

  const handleNext = () => {
    setCurrentSetIndex((index) => (index + 1) % setCount);
  };

  const startDrag = (clientX) => {
    dragStartX.current = clientX;
  };

  const endDrag = (clientX) => {
    if (dragStartX.current == null) return;
    const delta = clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) handleNext();
    else handlePrev();
  };

  const showButtons = width >= showButtonsMinWidth;

  const renderImagesInSet = (setIndex) => {
    const startIndex = setIndex * imagesPerFrame;
    const endIndex = Math.min(startIndex + imagesPerFrame, images.length);
    return images.slice(startIndex, endIndex).map((image, index) => (
      <div className="carousel-item" key={startIndex + index}>
        <FadeImage
          className={imageClassName}
          src={image}
          alt={`Image ${startIndex + index + 1}`}
          optimizeWidth={optimizeWidth}
          sizes={sizes}
          draggable={false}
        />
      </div>
    ));
  };

  return (
    <>
      <div className="img-container carousel-row" ref={rowRef}>
        {showButtons && (
          <div className="button-container">
            <img className="fat-cat" src="/fat-cat.png" alt="" />
            <button className="control-btn" onClick={handlePrev} type="button" aria-label="Previous photos">&lt;</button>
          </div>
        )}
        <div
          className="carousel-viewport"
          onMouseDown={(event) => startDrag(event.clientX)}
          onMouseUp={(event) => endDrag(event.clientX)}
          onTouchStart={(event) => startDrag(event.touches[0].clientX)}
          onTouchEnd={(event) => endDrag(event.changedTouches[0].clientX)}
        >
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentSetIndex * 100}%)` }}
          >
            {[...Array(setCount).keys()].map((setIndex) => (
              <div className={`carousel-slide ${frameClassName}`} key={setIndex}>
                {renderImagesInSet(setIndex)}
              </div>
            ))}
          </div>
        </div>
        {showButtons && (
          <div className="button-container">
            <img className="fat-cat" src="/fat-cat.png" alt="" />
            <button className="control-btn" onClick={handleNext} type="button" aria-label="Next photos">&gt;</button>
          </div>
        )}
      </div>
      <div className="image-circles" role="tablist" aria-label="Photo pages">
        {[...Array(setCount).keys()].map((setIndex) => (
          <button
            key={setIndex}
            type="button"
            role="tab"
            aria-label={`Photo page ${setIndex + 1}`}
            aria-selected={setIndex === currentSetIndex}
            className={`image-circle ${setIndex === currentSetIndex ? 'active' : ''}`}
            onClick={() => setCurrentSetIndex(setIndex)}
          />
        ))}
      </div>
    </>
  );
}
