import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import useWindowDimensions from "./useWindowDimensions"
import { motion } from 'framer-motion'
import { cloneDeep } from "lodash"
import fill from "../assets/IVAN.png"
import StoreItem from "./StoreItem"

const UpcomingDrops = ({ blurImages, censored, setCensored, stockFilter, setStockFilter, typeFilter, setTypeFilter, vendorFilter, setVendorFilter, setQuickShop, items, displayImages, censor, setCensor }) => {
  const [oneLineItems, setOneLineItems] = useState([])
  const [twoLineItems, setTwoLineItems] = useState([])
  const [threeLineItems, setThreeLineItems] = useState([])
  const { height, width } = useWindowDimensions()
  const [shownItems, setShownItems] = useState(3)
  // const navigate = useNavigate()
  const [mobile] = useState((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
  const [filter, setFilter] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState({
    stock: [],
    type: [],
    vendor: [],
  })
  const [filteredItems, setFilteredItems] = useState([])

  const checkItemTime = (curItem) => {
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
  
  useEffect(() => {
    let newItems = items.filter((it) => it.orderType === "upcomingDrop" && checkItemTime(it))
    setFilteredItems(newItems)
  }, [items])

  useEffect(() => {
    let newItems = cloneDeep(items.filter((it) => it.orderType === "upcomingDrop" && checkItemTime(it)))
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
      {
        <>
          {item.map(itemNew => 
            <StoreItem disabled={true} blurImages={blurImages} censored={censored} setCensored={setCensored} displayImages={displayImages} setQuickShop={setQuickShop} itemNew={itemNew}/>
          )}
          {/* {item.length === 1 && <img className='fill' src={fill}></img>} */}
          {(item.length === 1 || item.length === 2) && <img style={{width: item.length === 1 ? "66.66%" : item.length === 2 && "33.33%"}} className='fill' src={fill}></img>}
        </>
      }
    </div>
  )) 
  : width > 600 ?
    twoLineItems.slice(0, shownItems).map(item => (
      <div className='block block-2'>
        {
          <>
            {item.map(itemNew => 
              <StoreItem disabled={true} blurImages={blurImages} censored={censored} setCensored={setCensored} displayImages={displayImages} setQuickShop={setQuickShop} itemNew={itemNew}/>
            )}
            {item.length === 1 && <img className='fill' src={fill}></img>}
          </>
        }
      </div>
    ))
  : 
  oneLineItems.slice(0, shownItems).map(item => (
    <div className='block block-1'>
      {item.map(itemNew => 
        <StoreItem disabled={true} blurImages={blurImages} censored={censored} setCensored={setCensored} displayImages={displayImages} setQuickShop={setQuickShop} itemNew={itemNew}/>
      )}
    </div>
  ))
  
  return (
    <>
      <div className='store'>
        <div className='store-head'>
          <h2>{t("UPCOMING DROPS")}</h2>
          {/* <svg onClick={() => setFilter(prev => !prev)} fill='currentColor' clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.344 17.778c0-.414-.336-.75-.75-.75h-5.16c-.414 0-.75.336-.75.75s.336.75.75.75h5.16c.414 0 .75-.336.75-.75zm2.206-4c0-.414-.336-.75-.75-.75h-9.596c-.414 0-.75.336-.75.75s.336.75.75.75h9.596c.414 0 .75-.336.75-.75zm2.45-4c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75zm2-4c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero"/></svg> */}
        </div>

        {/* <motion.div initial={{y: -60}} animate={{y: filter ? 0 : -60}} transition={{type: "keyframes", ease: "linear", duration: .2}} className='filter-wrapper'>
          <motion.div className='filter'>
            <svg onClick={() => setAppliedFilters({stock: [], type: [], vendor: []})} className='bin' fill='currentColor' clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z" fill-rule="nonzero"/></svg>
            <div onClick={(e) => {e.stopPropagation();setStockFilter(prev => !prev);setTypeFilter(false);setVendorFilter(false)}} className='filter-item'>
              <p>{t("Stock")}</p>
              <svg className={`${stockFilter ? "rotated" : ""}`} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
              {
                stockFilter &&
                <div onClick={(e) => e.stopPropagation()} className='pop pop-1'>
                  <div className="checkbox">
                    <input
                      className="checkbox-pop"
                      type="checkbox" 
                      id="all"
                      checked={appliedFilters.stock.includes("all")}
                      onChange={(e) => {
                        e.target.checked ? setAppliedFilters(prev => ({...prev, stock: ["all"]})) : setAppliedFilters(prev => ({...prev, stock: prev.stock.filter(fi => fi !== "all")}))
                      }}
                    />
                    <label for="all"><span></span>All</label>
                  </div>
                  <div className="checkbox">
                    <input
                      className="checkbox-pop"
                      type="checkbox" 
                      id="inStock"
                      checked={appliedFilters.stock.includes("in stock")}
                      onChange={(e) => {
                        e.target.checked ? setAppliedFilters(prev => ({...prev, stock: ["in stock"]})) : setAppliedFilters(prev => ({...prev, stock: prev.stock.filter(fi => fi !== "in stock")}))
                      }}
                    />
                    <label for="inStock"><span></span>In stock</label>
                  </div>
                  <div className="checkbox">
                    <input 
                      className="checkbox-pop"
                      type="checkbox" 
                      id="outOfStock"
                      checked={appliedFilters.stock.includes("out of stock")}
                      onChange={(e) => {
                        e.target.checked ? setAppliedFilters(prev => ({...prev, stock: ["out of stock"]})) : setAppliedFilters(prev => ({...prev, stock: prev.stock.filter(fi => fi !== "out of stock")}))
                      }}
                    />
                    <label for="outOfStock"><span></span>Out of stock</label>
                  </div>
                </div>
              }
            </div>
            <div onClick={(e) => {e.stopPropagation();setTypeFilter(prev => !prev);setStockFilter(false);setVendorFilter(false)}} className='filter-item'>
              <p>{t("Type")}</p>
              <svg className={`${typeFilter ? "rotated" : ""}`} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
              {
                typeFilter &&
                <div onClick={(e) => e.stopPropagation()} className='pop pop-2'>
                  {[...new Set(items.map(it => it.type))].map(it => (
                    <div className="checkbox">
                      <input 
                        className="checkbox-pop" 
                        type="checkbox" 
                        id={it}
                        checked={appliedFilters.type.includes(it)}
                        onChange={(e) => e.target.checked ? setAppliedFilters(prev => ({...prev, type: [it]})) : setAppliedFilters(prev => ({...prev, type: prev.type.filter(fi => fi !== it)}))}
                      />
                      <label for={it}><span></span>{it}</label>
                    </div>
                  ))}
                </div>
              }
            </div>
            <div onClick={(e) => {e.stopPropagation();setVendorFilter(prev => !prev);setStockFilter(false);setTypeFilter(false)}} className='filter-item'>
              <p>{t("Vendor")}</p>
              <svg className={`${vendorFilter ? "rotated" : ""}`} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
              {
                vendorFilter &&
                <div onClick={(e) => e.stopPropagation()} className='pop pop-3'>
                  {[...new Set(items.map(it => it.madeBy))].map(it => (
                    <div className="checkbox">
                      <input
                        className="checkbox-pop"
                        type="checkbox" 
                        id={it}
                        checked={appliedFilters.vendor.includes(it)}
                        onChange={(e) => e.target.checked ? setAppliedFilters(prev => ({...prev, vendor: [it]})) : setAppliedFilters(prev => ({...prev, vendor: prev.vendor.filter(fi => fi !== it)}))}
                      />
                      <label for={it}><span></span>{it}</label>
                    </div>
                  ))}
                </div>
              }
            </div>
          </motion.div>
        </motion.div> */}
        <motion.div transition={{type: "keyframes", ease: "linear", duration: .2}} className='items'>
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

export default UpcomingDrops
