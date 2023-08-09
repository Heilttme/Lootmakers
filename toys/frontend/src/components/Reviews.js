import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import tg from "../assets/b-tg.png"
import { motion } from "framer-motion"
import useWindowDimensions from './useWindowDimensions'

const Reviews = ({ reviews }) => {
  const [fr1, setFr1] = useState([])
  const [fr2, setFr2] = useState([])
  const { height, width } = useWindowDimensions()

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  useEffect(() => {
    let newReviews = shuffle(reviews)
    const reviewsDisplay = reviews.map(item => (
      <div className='review'>
        <div className='top'>
          <div className='name'>
            <div className='f-col'>
              <img className='pfp' src={`http://127.0.0.1:8000${item.pfp}`}></img>
              <div className='text'>
                <h3>{item.nickname}</h3>
                <p><span>@</span>{item.username}</p>
              </div>
            </div>
            <img style={{filter: "invert(90%)"}} className='tg' src={tg} />
          </div>
          <div className='content'>{item.content}</div>
        </div>
        <div className='bot'>
          <img className='review-pic' src={`http://127.0.0.1:8000${item.reviewImage}`}/>
        </div>
      </div>
    ))
    
    let o = true
    for (let i = 0; i < reviews.length; i++){
      if (o){
        setFr1(prev => [...prev, reviewsDisplay[i]])
        o = false
      } else {
        setFr2(prev => [...prev, reviewsDisplay[i]])
        o = true
      }
    }

  }, [reviews])


  const [parentWidth, setParentWidth] = useState(450)
  useEffect(() => {
      let w = 450
      if (width <= 1200) {
        w = 350
        
        if (width <= 1000) {
          w = 300

          if (width <= 650) {
            w = 250

            if (width <= 450) {
              w = 220

              if (width <= 360) {
                w = 200

              }
            }
          } 
        }
      } 
      setParentWidth(w)
    }, [width])

  return (
    <>
      <div className='review-head'>
        <h2>{t("OUR REVIEWS")}</h2>
      </div>
      <div className='reviews-wrapper'>
        <div className='reviews'>
          <motion.div
            animate={{x: -parentWidth * fr1.length + width - fr1.length}}
            transition={{duration: 50, repeat: Infinity, ease: "linear", repeatType: 'reverse'}}
            className='l1 l'
          >
            {fr1}
          </motion.div>
          <motion.div
            initial={{translateX: -(parentWidth / 2)}}
            animate={{x: -(parentWidth * fr2.length) + width - fr2.length + (parentWidth)}}
            transition={{duration: 35, repeat: Infinity, ease: "linear", repeatType: "reverse"}}
            className='l2 l'
          >
            {fr2}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Reviews