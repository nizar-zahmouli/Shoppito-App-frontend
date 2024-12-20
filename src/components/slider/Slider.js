import React, { useEffect, useState } from 'react';
import "./Slider.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from './slider-data'
import { useNavigate } from 'react-router-dom'

const Slider = () => {
  const [currrentSlide, setCurrentSlide] = useState(0)
  const slideLength = sliderData.length;
  const autoScroll = true;
  let slideInterval;
  const IntervalTime = 5000

  const navigate = useNavigate
  const nextSlide = () => {
    setCurrentSlide(currrentSlide === slideLength - 1 ? 0 :
      currrentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currrentSlide === 0 ? slideLength - 1 :
      currrentSlide -  1 );
  }
  useEffect(() => {
    setCurrentSlide(0)
  },[])
  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide ,IntervalTime)
      }
      auto();
    }
    return ()=> clearInterval(slideInterval)
  },[currrentSlide,IntervalTime,autoScroll])
  return (
    <div className='slider'>
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide
        return (
          <div key={index} className={index === currrentSlide ? "slide current" : "slide"} >
            {index === currrentSlide && (
              <>
                <img src={image} alt="slider" />
                <div className='content'>
                  <span className='span1'></span>
                  <span className='span2'></span>
                  <span className='span3'></span>
                  <span className='span4'></span>
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <button className='--btn --btn-primary' onClick={
                    () => navigate("/shop")
                  }>
                    Shop Now
                  </button>
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
export default Slider