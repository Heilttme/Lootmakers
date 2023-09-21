import axios from 'axios'
import { t } from 'i18next'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  const [upComingDropEnabled, setUpComingDropEnabled] = useState(false)
  const navigate = useNavigate()

  const slides = [displayImage, mapped3DImages, ...imageList.map(item => item.image)]

  useEffect(() => {
    window.scrollTo(0, 0);
    if (curItem){
      if (curItem.blurred) {
        navigate("/")
      }
      curItem.censor === true && setAgeRestriction(true)
    }

    return () => setAgeRestriction(false)
  }, [curItem])

  useEffect(() => {
    if (items.filter(i => parseInt(i.id) === parseInt(id)).length) {
      setCurItem(items.filter(i => parseInt(i.id) === parseInt(id))[0])
    } else {
      navigate("/")
    }
  }, [items, id])

  useEffect(() => {
    if (curItem && curItem.orderType !== "upcomingDrop" && curItem.orderType !== "order") {
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

    } else if (curItem && curItem.orderType === "upcomingDrop" && curItem.orderType !== "order") {
      const countDownDate0 = curItem && new Date(curItem.year, curItem.month - 1, curItem.day, curItem.hour)
      const countDownDate1 = curItem && new Date(curItem.year1, curItem.month1 - 1, curItem.day1, curItem.hour1)

      const now = new Date().getTime()
      const distance0 = countDownDate0 - now
      const distance1 = countDownDate1 - now

      const days0 = Math.floor(distance0 / (1000 * 60 * 60 * 24))
      const hours0 = Math.floor((distance0 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes0 = Math.floor((distance0 % (1000 * 60 * 60)) / (1000 * 60))
      const seconds0 = Math.floor((distance0 % (1000 * 60)) / 1000)

      const days1 = Math.floor(distance1 / (1000 * 60 * 60 * 24))
      const hours1 = Math.floor((distance1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes1 = Math.floor((distance1 % (1000 * 60 * 60)) / (1000 * 60))
      const seconds1 = Math.floor((distance1 % (1000 * 60)) / 1000)
      setUpComingDropEnabled((days1 > 0 && hours1 > 0 && minutes1 > 0 && seconds1 > 0) && (days0 <= 0 && hours0 <= 0 && minutes0 <= 0 && seconds0 <= 0))
      setTime([days1, hours1, minutes1, seconds1])
      const x = setInterval(() => {
        const now = new Date().getTime()
        const distance = countDownDate1 - now

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
    if (curItem) {
      const res1 = axios.post("http://127.0.0.1:8000/api/get_item_3d_images/", {id: curItem.id}).then(data => setImages3D(data.data.data))
      const res2 = axios.post("http://127.0.0.1:8000/api/get_item_images/", {id: curItem.id}).then(data => setImageList(data.data.data))
      const res3 = axios.post("http://127.0.0.1:8000/api/get_display_image/", {id: curItem.id}).then(data => setDisplayImage(data.data.data[0].image))
    }
  }, [curItem])

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

  console.log(curItem);

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
            ((curItem.orderType === "preorder" && !isItemDisabled) || (curItem.orderType === "upcomingDrop" && upComingDropEnabled)) ? 
            <>
              <motion.div initial={{x: 0}} animate={{x: -2000}} transition={{duration: 50, repeat: Infinity, repeatType: "reverse", ease: "linear"}} className='preorder'>
                {[...Array(100)].map(() => <p>PREORDER</p>)}
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
              : (curItem.orderType === "preorder" && isItemDisabled) ?
            <>
              <motion.div initial={{x: 0}} animate={{x: -2000}} transition={{duration: 50, repeat: Infinity, repeatType: "reverse", ease: "linear"}} className='preorder'>
                {[...Array(100)].map(() => <p>EXPIRED</p>)}
              </motion.div>
              <div className='timer'>
                <h2>{curItem.orderType === "preorder" ? "PREORDER" : "ORDER"} WAS AVAILABLE UNTIL:</h2>
                <div className='wrapper-timer'>
                  <h2>{curItem.day} {monthes[curItem.month - 1]} {curItem.year}</h2>
                </div>
              </div>  
            </>
              : (curItem.orderType === "upcomingDrop" && !isItemDisabled) ?
            <>
              <motion.div initial={{x: 0}} animate={{x: -2000}} transition={{duration: 50, repeat: Infinity, repeatType: "reverse", ease: "linear"}} className='preorder'>
                {[...Array(100)].map(() => <p>SOON</p>)}
              </motion.div>
              <div className='timer'>
                <h2>{curItem.orderType === "preorder" ? "PREORDER" : "ORDER"} WILL BE AVAILABLE ON:</h2>
                <div className='wrapper-timer'>
                  <h2>{curItem.day} {monthes[curItem.month - 1]} {curItem.year}</h2>
                </div>
              </div>  
            </>
              : (curItem.orderType === "order" && curItem.year === null && curItem.month === null && curItem.day === null && curItem.hour === null) &&
            <>
              {/* <motion.div initial={{x: 0}} animate={{x: -2000}} transition={{duration: 50, repeat: Infinity, repeatType: "reverse", ease: "linear"}} className='preorder'>
                {[...Array(100)].map(() => <p>SOON</p>)}
              </motion.div>
              <div className='timer'>
                <h2>{curItem.orderType === "preorder" ? "PREORDER" : "ORDER"} WILL BE AVAILABLE ON:</h2>
                <div className='wrapper-timer'>
                  <h2>{curItem.day} {monthes[curItem.month - 1]} {curItem.year}</h2>
                </div>
              </div>   */}
            </>
          }
        <div className='bottom'>
          <h3>{curItem.collection}</h3>
          <h2>{curItem.name}</h2>
          <div className='price-block'>
            <h1>${curItem.price}</h1>
            <button ref={buttonRef} onClick={() => !isItemDisabled && addToCart(curItem)}>
              {
                (!isItemDisabled || curItem.orderType === "order") ? 
                <>
                  <motion.p initial={{x: 0}} animate={{x: inCart ? -200 : 0}}>{t("ADD TO CART")}</motion.p>
                  <motion.p initial={{x: 150}} animate={{x: inCart ? 0 : 150}} className='added'>{t("ADDED")}</motion.p>
                </>
                  : (curItem.orderType === "preorder" && isItemDisabled) ? 
                <>
                  <p>SOLD OUT</p>
                </>
                  :
                <>
                  <p>COMING SOON</p>
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