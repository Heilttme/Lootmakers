import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import useWindowDimensions from "./useWindowDimensions"
import { motion } from 'framer-motion'
import { cloneDeep } from "lodash"
import StoreItem from "./StoreItem"

const Archive = ({ censored, setCensored, setQuickShop, items, storeRef, displayImages }) => {
  const [oneLineItems, setOneLineItems] = useState([])
  const [twoLineItems, setTwoLineItems] = useState([])
  const [threeLineItems, setThreeLineItems] = useState([])
  const { height, width } = useWindowDimensions()
  const [shownItems, setShownItems] = useState(3)
  const [mobile] = useState((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
  // const [filter, setFilter] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState({
    stock: [],
    type: [],
    vendor: [],
  })

  const checkItemTime = (curItem) => {
    if (curItem){
      const countDownDate = curItem && new Date(curItem.year, curItem.month - 1, curItem.day, curItem.hour)
  
      const now = new Date().getTime()
      const distance = countDownDate - now
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      return (days >= 0 && hours >= 0 && minutes >= 0 && seconds >= 0)
    }
  }

  const checkUpcomingItemTime = (curItem) => {
    if (curItem){
      const countDownDate = curItem && new Date(curItem.year1, curItem.month1 - 1, curItem.day1, curItem.hour1)
  
      const now = new Date().getTime()
      const distance = countDownDate - now
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      return (days >= 0 && hours >= 0 && minutes >= 0 && seconds >= 0)
    }
  }

  const [filteredItems, setFilteredItems] = useState(items.filter(it => (it.orderType === "upcomingDrop" && !checkUpcomingItemTime(it)) || (it.orderType === "preorder" && !checkItemTime(it))))
  

  useEffect(() => {
    setFilteredItems(items.filter(it => (it.orderType === "upcomingDrop" && !checkUpcomingItemTime(it)) || (it.orderType === "preorder" && !checkItemTime(it))))
  }, [items])

  useEffect(() => {
    let newItems = cloneDeep(items.filter(it => (it.orderType === "upcomingDrop" && !checkUpcomingItemTime(it)) || (it.orderType === "preorder" && !checkItemTime(it))))
    const stock = appliedFilters.stock
    const type = appliedFilters.type
    const vendor = appliedFilters.vendor
    
    if (stock.includes("in stock")) {
      newItems = newItems.filter(it => it.quantityAvailable >= 1)
    }

    if (stock.includes("out of stock")) {
      newItems = newItems.filter(it => it.quantityAvailable === 0)
    }

    if (stock.includes("all")) {
      newItems = items.filter(it => ((it.quantityAvailable === 0) || (it.quantityAvailable >= 1)))
    }

    newItems = newItems.filter(it => type.map(t => t === it.type).every(el => el === true))
    newItems = newItems.filter(it => vendor.map(v => v === it.madeBy).every(el => el === true))
    
    setFilteredItems(newItems)
  }, [appliedFilters])

  useEffect(() => {
    const newItems = []
    let newAr = [] 
    for (let i = 0; i < filteredItems.length; i++) {
      newAr.push(filteredItems[i])
      
      if (newAr.length === 3) {
        newItems.push(newAr)
        newAr = []
      }
    }
    if (newAr.length !== 0){
      newItems.push(newAr)
    }
    setThreeLineItems(newItems)
  }, [filteredItems, width])

  useEffect(() => {
    const newItems = []
    let newAr = [] 
    for (let i = 0; i < filteredItems.length; i++) {
      newAr.push(filteredItems[i])

      if (newAr.length === 2) {
        newItems.push(newAr)
        newAr = []
      }
    }
    if (newAr.length !== 0){
      newItems.push(newAr)
    }
    setTwoLineItems(newItems)
  }, [filteredItems, width])

  useEffect(() => {
    const newItems = []
    let newAr = [] 
    for (let i = 0; i < filteredItems.length; i++) {
      newAr.push(filteredItems[i])

      if (newAr.length === 1) {
        newItems.push(newAr)
        newAr = []
      }
    }
    if (newAr.length !== 0){
      newItems.push(newAr)
    }
    setOneLineItems(newItems)
  }, [filteredItems, width])

  const threeItemsDisplay = width > 1000 ? threeLineItems.slice(0, shownItems).map(item => (
    <div className='block block-3'>
      {item.map(itemNew => 
        <StoreItem censored={censored} setCensored={setCensored} displayImages={displayImages} setQuickShop={setQuickShop} itemNew={itemNew}/>
      )}
    </div>
  )) 
  : width > 600 ?
    twoLineItems.slice(0, shownItems).map(item => (
      <div className='block block-2'>
        {item.map(itemNew => 
          <StoreItem censored={censored} setCensored={setCensored} displayImages={displayImages} setQuickShop={setQuickShop} itemNew={itemNew}/>
        )} 
      </div>
    ))
  : 
  oneLineItems.slice(0, shownItems).map(item => (
    <div className='block block-1'>
      {item.map(itemNew => 
        <StoreItem censored={censored} setCensored={setCensored} displayImages={displayImages} setQuickShop={setQuickShop} itemNew={itemNew}/>
      )}
    </div>
  ))

  console.log(filteredItems);

  return (
    <>
      <div ref={storeRef} className='store'>
          <div className='store-head'>
            <h2>{t("ARCHIVE")}</h2>
          </div>
          <motion.div transition={{type: "keyframes", ease: "linear", duration: .2}} className='items archive'>
            {threeItemsDisplay}
              {
                shownItems < (width > 1000 ? filteredItems.length / 3 : width > 600 ? filteredItems.length / 2 : filteredItems.length) &&
                <div className='more'>
                  <button onClick={() => setShownItems(prev => prev + 3)}>MORE</button>
                </div>
              }
          </motion.div>
      </div>
    </>
  )
}


export default Archive