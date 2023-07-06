import React, { useState } from 'react';


const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
   
    'https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/07/buy-electronics.jpg',
    'https://www.netans.com/wp-content/uploads/2016/05/Snapdeal-Mega-Electronics-Sale.png',
    
  ];

  const goToNextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <div className="slider">
      <div className="image-container">
        <img src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
        <button className="slider-button left" onClick={goToPreviousSlide}>
          &lt;
        </button>
        <button className="slider-button right" onClick={goToNextSlide}>
          &gt;
        </button>
        <button className="start-button">Get Started</button>
      </div>
    </div>
  );
};

export default ImageSlider;
