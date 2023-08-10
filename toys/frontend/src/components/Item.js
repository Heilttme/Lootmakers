import axios from 'axios'
import { t } from 'i18next'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../store'
import ItemPageSlider from "./ItemPageSlider"
import ItemsSlider from "./ItemsSlider"
import { motion } from "framer-motion"
import useWindowDimensions from "./useWindowDimensions"

const Item = ({ buttonRef, addToCart, cart, items, setAgeRestriction, ageRestriction }) => {
  const { id } = useParams()
  const [curItem, setCurItem] = useState(items.filter(i => i.id === id)[0])
  const [mapped3DImages, setMapped3DImages] = useState([])
  const [imageList, setImageList] = useState([])
  const [displayImage, setDisplayImage] = useState("")
  const [images3D, setImages3D] = useState([])
  const { height, width } = useWindowDimensions()
  const [parentWidth, setParentWidth] = useState()
  const [inCart, setInCart] = useState(false)
  const [time, setTime] = useState([])
  const [isItemDisabled, setIsItemDisabled] = useState(false)

  const slides = [displayImage, mapped3DImages, ...imageList.map(item => item.image)]

  useEffect(() => {
    window.scrollTo(0, 0);
    curItem && curItem.censor === true && setAgeRestriction(true)

    return () => setAgeRestriction(false)
  }, [curItem])

  useEffect(() => {
    setCurItem(items.filter(i => parseInt(i.id) === parseInt(id))[0])
  }, [items, id])

  useEffect(() => {
    if (curItem) {
      const countDownDate = curItem && new Date(curItem.year, curItem.month - 1, curItem.day, curItem.hour)

      const now = new Date().getTime()
      const distance = countDownDate - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      setTime([days, hours, minutes, seconds])
      
        const x = setInterval(() => {
          const now = new Date().getTime()
          const distance = countDownDate - now
  
          const days = Math.floor(distance / (1000 * 60 * 60 * 24))
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)
          setTime([days, hours, minutes, seconds])
        }, 1000)
    }
  }, [curItem])

  useEffect(() => {
    if (curItem) {

      setIsItemDisabled(time[0] <= 0 && time[1] <= 0 && time[2] <= 0 && time[3] <= 0)
    }
  }, [curItem, time])
  
  useEffect(() => {
    setMapped3DImages(images3D.map(item => item.image))
  }, [images3D])

  useEffect(() => {
    const res1 = axios.post("http://127.0.0.1:8000/api/get_item_3d_images/", {id}).then(data => setImages3D(data.data.data))
    const res2 = axios.post("http://127.0.0.1:8000/api/get_item_images/", {id}).then(data => setImageList(data.data.data))
    const res3 = axios.post("http://127.0.0.1:8000/api/get_display_image/", {id}).then(data => setDisplayImage(data.data.data[0].image))
  }, [id])

  useEffect(() => {
    let w = 600
    if (width <= 1500) {
      w = 500
      
      if (width <= 1300) {
        w = 400

        if (width <= 1100) {
          w = 330

          if (width <= 700) {
            w = 400

            if (width <= 550) {
              w = 340

              if (width <= 450) {
                w = 300
                
                if (width <= 380) {
                  w = 260

                  if (width <= 320){
                    w = 220
                  }
                }
              }
            }
          }
        } 
      }
    } 
    setParentWidth(w)
  }, [width])

  const checkIfInCart = () => curItem && cart.filter(it => it.id === curItem.id).length !== 0

  useEffect(() => {
    setInCart(checkIfInCart)
  }, [cart, curItem])

  const monthes = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  }


  return curItem && (
    <div className='item-page'>
      <div className='image-slider-container' style={{filter: ageRestriction ? "blur(1rem)" : ""}}>
        {
          width > 700 ?
          <ItemPageSlider mapped3DImages={mapped3DImages} item={curItem} slides={slides} parentWidth={parentWidth} />
          :
          <ItemsSlider mapped3DImages={mapped3DImages} item={curItem} slides={slides} parentWidth={parentWidth} />
        }
      </div>
      <div className='s-col'>
          {
            curItem.orderType === "preorder" && !isItemDisabled ? 
            <>
              <motion.div initial={{x: 0}} animate={{x: -2000}} transition={{duration: 50, repeat: Infinity, repeatType: "reverse", ease: "linear"}} className='preorder'>
                {[...Array(100)].map(() => <p>PREORDER</p>)}
                {/* <div className='blocker blocker-1'/>
                <div className='blocker blocker-2'/> */}
              </motion.div>
              <div className='timer'>
                <h2>PREORDER IS AVAILABLE FOR:</h2>
                <div className='wrapper-timer'>
                  <div className='time'>
                    <span>DAYS</span>
                    <span className='digit'>{time[0]}</span>
                  </div>
                  <div className='time'>
                    <span>HOURS</span>
                    <span className='digit'>{time[1]}</span>
                  </div>
                  <div className='time'>
                    <span>MINUTES</span>
                    <span className='digit'>{time[2]}</span>
                  </div>
                  <div className='time'>
                    <span>SECONDS</span>
                    <span className='digit'>{time[3]}</span>
                  </div>
                </div>
              </div>  
            </>
              :
            <>
              <motion.div initial={{x: 0}} animate={{x: -2000}} transition={{duration: 50, repeat: Infinity, repeatType: "reverse", ease: "linear"}} className='preorder'>
                {[...Array(100)].map(() => <p>EXPIRED</p>)}
                {/* <div className='blocker blocker-1'/>
                <div className='blocker blocker-2'/> */}
              </motion.div>
              <div className='timer'>
                <h2>PREORDER WAS AVAILABLE UNTIL:</h2>
                <div className='wrapper-timer'>
                  <h2>{curItem.day} {monthes[curItem.month - 1]} {curItem.year}</h2>
                </div>
              </div>  
            </>
          }
        <div className='bottom'>
          <h3>{curItem.collection}</h3>
          <h2>{curItem.name}</h2>
          <div className='price-block'>
            <h1>${curItem.price}</h1>
            <button ref={buttonRef} onClick={() => !isItemDisabled && addToCart(curItem)}>
              {
                !isItemDisabled ? 
                <>
                  <motion.p initial={{x: 0}} animate={{x: inCart ? -200 : 0}}>{t("ADD TO CART")}</motion.p>
                  <motion.p initial={{x: 150}} animate={{x: inCart ? 0 : 150}} className='added'>{t("ADDED")}</motion.p>
                </>
                  :
                <>
                  <p>SOLD OUT</p>
                </>
              }
            </button>
          </div>
          <div className='block-info'>
            {curItem.blockInfo.split(";").map(bl => (
              <div className='line'>
                <div className='l'>{t(bl.split(":")[0]).toUpperCase()}</div>
                <div className='r'>{t(bl.split(":")[1]).toUpperCase()}</div>
              </div>
            ))}
          </div>
          <div className='main-text'>
            {curItem.mainText.split(";").map((it, i) => (
              <p className={`${i % 2 === 0 ? "odd" : "even"}`}>{it}</p>
            ))}
          </div>
          <div className='quote'>
            <h2>"{curItem.quote}"</h2>
            <h2 className='said'>©{curItem.author}</h2>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Item