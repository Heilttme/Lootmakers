import { useCallback, useEffect, useRef, useState } from "react";
import ScrollImages3D from "./ScrollImages3D";
import { useHorizontalScroll } from "./useHorScroll";


const ItemsSlider = ({ mapped3DImages, item, slides, parentWidth }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  const getSlidesContainerStylesWithWidth = () => ({
    width: parentWidth * slides.length,
    display: "flex",
    transition: "transform ease-out 0.3s",
    transform: `translateX(${-(currentIndex * parentWidth)}px)`,
  })


  const imagesContainer = document.getElementsByClassName("bot-images")[0]
  const sub = imagesContainer && imagesContainer.getElementsByTagName("div")
  if (sub){
    for (let i = 0; i < sub.length; i++){
      sub[i] && sub[i].addEventListener("click", () => sub[i].scrollTo({left: sub[i].scrollLeft + sub[i].deltaY, behavior: "smooth"}))
    }
  }

  const timerRef = useRef(null)
  const [stopped, setStopped] = useState(false)

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }, [currentIndex, slides])

  useEffect(() => {
    if (timerRef.current || stopped) {
      clearTimeout(timerRef.current)
    }
    if (!stopped) {
      timerRef.current = setTimeout(() => goToNext(), 3000)
    }
    return () => clearTimeout(timerRef.current);
  }, [stopped, goToNext]);

  const scrollRef = useHorizontalScroll()

  const handleImageClick = (event) => {
    const container = scrollRef.current
    const image = event.target
    const containerRect = container.getBoundingClientRect()
    const imageRect = image.getBoundingClientRect()

    const offsetTop = imageRect.top - containerRect.top
    const offsetLeft = imageRect.left - containerRect.left

    container.scrollTo({
      top: offsetTop,
      left: offsetLeft,
      behavior: 'smooth',
    })
  }
  
  return (
    <div className="slider">
      <div onClick={() => {goToSlide(currentIndex - 1 >= 0 ? currentIndex - 1 : slides.length - 1);setStopped(true)}} className="arrow left">
        <svg fill="currentColor" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fill-rule="nonzero"/></svg>
      </div>
      <div onClick={() => {goToSlide(currentIndex + 1 >= slides.length ? 0 : currentIndex + 1);setStopped(true)}} className="arrow right">
        <svg fill="currentColor" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z" fill-rule="nonzero"/></svg>
      </div>
      <div className="slider-wrapper">
        <div className="slider-container" style={getSlidesContainerStylesWithWidth()}>
          {slides.map((_, slideIndex) => (
            slideIndex !== 1 ? 
            (<img
              id="in"
              className="im"
              key={slideIndex}
              src={`http://127.0.0.1:8000${slides[slideIndex]}`}
            />) 
            :
            (<ScrollImages3D setStopped={setStopped} mapped3DImages={mapped3DImages} item={item}/>)
          ))}
        </div>
      </div>
      <div ref={scrollRef} className="bot-images">
        <ImageBottom containerRef={scrollRef} handleImageClick={handleImageClick} imgIndex={0} currentIndex={currentIndex} onClick={(e) => {handleImageClick(e);goToSlide(0);setStopped(true)}} slide={slides[0]} classN={`img-nav${currentIndex === 0 ? " chosen" : ""}`}/>
        <ImageBottom containerRef={scrollRef} handleImageClick={handleImageClick} imgIndex={1} currentIndex={currentIndex} onClick={(e) => {handleImageClick(e);goToSlide(1);setStopped(true)}} slide={slides[1][0]} classN={`img-nav${currentIndex === 1 ? " chosen" : ""}`}/>
        {/* <div onClick={() => {goToSlide(0);setStopped(true)}}> */}
          {/* {true && <img src={`http://127.0.0.1:8000${slides[0]}`} onClick={(e) => e.target.scrollTo(e)} className={`img-nav${currentIndex === 0 ? " chosen" : ""}`}/>} */}
          {/* {slideIndex + 1 <= slides.length && <img src={`http://127.0.0.1:8000${slides[slideIndex + 1]}`} onClick={(e) => e.target.scrollTo(e)} className={`img-nav${currentIndex === slideIndex + 1 ? " chosen" : ""}`}/>} */}
        {/* </div> */}
        {/* <div onClick={() => {goToSlide(1);setStopped(true)}}>
          <img id="in" className={`img-nav${currentIndex === 1 ? " chosen" : ""}`} src={`http://127.0.0.1:8000${slides[1][0]}`}/>
        </div> */}
        {slides.slice(2).map((slide, slideIndex) => (
          // <div onClick={() => {goToSlide(slideIndex + 2);setStopped(true)}}>
          //     {true && <img src={`http://127.0.0.1:8000${slide}`} onClick={(e) => e.target.scrollTo(e)} className={`img-nav${currentIndex === slideIndex + 2 ? " chosen" : ""}`}/>}
          //     {/* {slideIndex + 2 <= slides.length && <img src={`http://127.0.0.1:8000${slides[slideIndex + 2]}`} onClick={(e) => e.target.scrollTo(e)} className={`img-nav${currentIndex === slideIndex ? " chosen" : ""}`}/>} */}
          // </div>
          <ImageBottom containerRef={scrollRef} handleImageClick={handleImageClick} imgIndex={slideIndex + 2} currentIndex={currentIndex} onClick={(e) => {handleImageClick(e);goToSlide(slideIndex + 2);setStopped(true)}} slide={slide} classN={`img-nav${currentIndex === slideIndex + 2 ? " chosen" : ""}`} />
        ))}
      </div>
    </div>
  )
}

const ImageBottom = ({ containerRef, imgIndex, currentIndex, onClick, slide, classN }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (currentIndex === imgIndex && containerRef.current) {
      const container = containerRef.current
      const image = ref.current
      const containerRect = container.getBoundingClientRect()
      const imageRect = image.getBoundingClientRect()

      const offsetTop = imageRect.top - containerRect.top
      const offsetLeft = imageRect.left - containerRect.left

      container.scrollTo({
        top: offsetTop,
        left: offsetLeft,
        behavior: 'smooth',
      })
    }
  }, [currentIndex])
  
  return (
    <div ref={ref} onClick={(e) => {onClick(e)}}>
        {true && <img src={`http://127.0.0.1:8000${slide}`} onClick={(e) => e.target.scrollTo(e)} className={classN}/>}
        {/* {slideIndex + 2 <= slides.length && <img src={`http://127.0.0.1:8000${slides[slideIndex + 2]}`} onClick={(e) => e.target.scrollTo(e)} className={`img-nav${currentIndex === slideIndex ? " chosen" : ""}`}/>} */}
    </div>
  )
}

export default ItemsSlider;