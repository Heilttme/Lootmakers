import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const StoreItem = ({ blurImages, displayImages, setQuickShop, itemNew, censored, setCensored, disabled }) => {
  const navigate = useNavigate()
  const [mobile] = useState((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
  const [isItemDisabled, setIsItemDisabled] = useState(false)
  const [time, setTime] = useState([])
  const [upComingDropEnabled, setUpComingDropEnabled] = useState(false)

  useEffect(() => {
    // TIMER IS MADE OF 2 CASES (TYPES OF ITEM, EITHER UPCOMING DROP OR OTHER ONES)
    if (itemNew && itemNew.orderType !== "upcomingDrop") {
      const countDownDate = itemNew && new Date(itemNew.year, itemNew.month - 1, itemNew.day, itemNew.hour)

      const now = new Date().getTime()
      const distance = countDownDate - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      setTime([days, hours, minutes, seconds])
      
      // const x = setInterval(() => {
      //   const now = new Date().getTime()
      //   const distance = countDownDate - now

      //   const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      //   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      //   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      //   const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      //   setTime([days, hours, minutes, seconds])
      // }, 1000)

    } else if (itemNew && itemNew.orderType === "upcomingDrop") {
      const countDownDate0 = itemNew && new Date(itemNew.year, itemNew.month - 1, itemNew.day, itemNew.hour)
      const countDownDate1 = itemNew && new Date(itemNew.year1, itemNew.month1 - 1, itemNew.day1, itemNew.hour1)

      const now = new Date().getTime()
      const distance0 = countDownDate0 - now
      const distance1 = countDownDate1 - now

      //
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
    }
  }, [itemNew])

  useEffect(() => {
    if (itemNew) {
      if (itemNew.orderType === "upcomingDrop" && time[0] <= 0 && time[1] <= 0 && time[2] <= 0 && time[3] <= 0)
      setIsItemDisabled(false)
    }
  }, [itemNew, time])

  const checkItemTime = (curItem) => {
    // used to check if preorder or upcoming date time is either expired or not
    // checks if starting date (countDownDate) is less than now 
    if (curItem){
      const countDownDate = curItem && new Date(curItem.year, curItem.month - 1, curItem.day, curItem.hour)
      const now = new Date().getTime()
      const distance = countDownDate - now
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      return (days >= 0 && hours >= 0 && minutes >= 0 && seconds >= 0) || (curItem.year === 0 && curItem.month === 0 && curItem.day === 0 && curItem.hour === 0)
    }
  }

  const checkUpcomingTime = (curItem) => {
    // used to check if upcoming date time is either started or not and expired
    // checks if starting date (countDownDate1) is greater than now 
    if (curItem){
      const countDownDate1 = curItem && new Date(curItem.year1, curItem.month1 - 1, curItem.day1, curItem.hour1)

      const now = new Date().getTime()
      const distance1 = countDownDate1 - now
  
      const days1 = Math.floor(distance1 / (1000 * 60 * 60 * 24))
      const hours1 = Math.floor((distance1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes1 = Math.floor((distance1 % (1000 * 60 * 60)) / (1000 * 60))
      const seconds1 = Math.floor((distance1 % (1000 * 60)) / 1000)

      return (days1 <= 0 && hours1 <= 0 && minutes1 <= 0 && seconds1 <= 0)
    }
  }

  useEffect(() => {
    if (itemNew.blurred && !checkItemTime(itemNew)) navigate("/")
  }, [itemNew])

  return (
    <motion.div onClick={() => !itemNew.blurred && navigate(`/items/${itemNew.id}`)} className={`${disabled ? "dis item" : "item"}`}>
    {/* <motion.div style={{filter: itemNew.orderType === "upcomingDrop" && "grayscale(100%)"}} onClick={() => !itemNew.blurred && navigate(`/items/${itemNew.id}`)} className={`${itemNew.blurred ? "dis item" : "item"}`}> */}
      {
        itemNew.orderType === "preorder" && 
        <>
          <motion.div initial={{x: 0}} animate={{x: -2000}} transition={{duration: 50, repeat: Infinity, repeatType: "reverse", ease: "linear"}} className='preorder'>
          {[...Array(100)].map(() => <p>PREORDER</p>)}
          </motion.div>
          <div className='blocker blocker-1'/>
          <div className='blocker blocker-2'/>
        </>
      }
      {
        itemNew.censor === true && 
        <>
          <motion.div initial={{x: 0}} animate={{x: -1000}} transition={{duration: 50, repeat: Infinity, repeatType: "reverse", ease: "linear"}} className='preorder'>
          {[...Array(100)].map(() => <p>CENSORED</p>)}
          </motion.div>
          <div className='blocker blocker-1'/>
          <div className='blocker blocker-2'/>
        </>
      }
      {
        itemNew.blurred === true && 
        <>
          <motion.div initial={{x: 0}} animate={{x: -1000}} transition={{duration: 50, repeat: Infinity, repeatType: "reverse", ease: "linear"}} className='preorder'>
          {[...Array(100)].map(() => <p>RESTRICTED</p>)}
          </motion.div>
          <div className='blocker blocker-1'/>
          <div className='blocker blocker-2'/>
        </>
      }
      {
        (itemNew.blurred === true && itemNew.censor === true) && 
        <>
          <motion.div initial={{x: 0}} animate={{x: -1000}} transition={{duration: 50, repeat: Infinity, repeatType: "reverse", ease: "linear"}} className='preorder'>
          {[...Array(100)].map(() => <><p>RESTRICTED</p><p>CENSORED</p></>)}
          </motion.div>
          <div className='blocker blocker-1'/>
          <div className='blocker blocker-2'/>
        </>
      }

      <div className='img-wrapper'>
        <img style={{filter: (censored && itemNew.censor === true) ? "blur(2rem)" : "unset"}} src={`http://127.0.0.1:8000${itemNew.blurred ? (blurImages ? blurImages.length : 0) && blurImages.filter(image => image.item === itemNew.id)[0].image : displayImages.length && displayImages.filter(image => image.item === itemNew.id)[0].image}`}/>
      </div>
      <div className='text-wrapper'>
        <div className='text'>
          <h2 className='col'>{itemNew.collection}</h2>
          <h2 className='name'>{itemNew.name}</h2>
        </div>
        {
          (!mobile && ((itemNew.orderType === "upcomingDrop" && upComingDropEnabled) || itemNew.orderType !== "upcomingDrop" && !isItemDisabled)) && 
          <button onClick={(e) => {e.stopPropagation();setQuickShop(itemNew.id)}} className='quick-btn1 quick-btn'>QUICK SHOP</button>
        }
      </div>
    </motion.div>
  )
}

export default StoreItem