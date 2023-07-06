import { useCallback, useEffect, useRef, useState } from "react";
import ScrollImages3D from "./ScrollImages3D";

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
};

const slidesContainerOverflowStyles = {
  overflow: "hidden",
  height: "100%",
};

const ImageSlider = ({ mapped3DImages, item, slides, parentWidth }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  const getSlidesContainerStylesWithWidth = () => ({
    width: parentWidth * slides.length,
    display: "flex",
    height: "100%",
    transition: "transform ease-out 0.3s",
    transform: `translateX(${-(currentIndex * parentWidth)}px)`,
  })

  return (
    <div className="slider" style={sliderStyles}>
      <div style={slidesContainerOverflowStyles}>
        <div style={getSlidesContainerStylesWithWidth()}>
          {slides.map((_, slideIndex) => (
            slideIndex !== 0 ? 
            (<img
              className="im"
              key={slideIndex}
              src={`http://127.0.0.1:8000${slides[slideIndex]}`}
            />) 
            :
            (<ScrollImages3D mapped3DImages={mapped3DImages} item={item}/>)
          ))}
        </div>
      </div>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;