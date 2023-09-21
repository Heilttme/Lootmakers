import React from 'react'
import Reviews from "./Reviews"
import BRUT from "../assets/BRUT.png"
import Store from './Store'
import UpcomingDrops from './UpcomingDrops'

const Home = ({ blurImages, censored, setCensored, stockFilter, setStockFilter, typeFilter, setTypeFilter, vendorFilter, setVendorFilter, setQuickShop, reviews, items, storeRef, displayImages }) => {
  return (
    <div className='home'>
      <div className='gr-image'>
        {/* <img src={BRUT}/> */}
      </div>
      <Store blurImages={blurImages} censored={censored} setCensored={setCensored} stockFilter={stockFilter} setStockFilter={setStockFilter} typeFilter={typeFilter} setTypeFilter={setTypeFilter} vendorFilter={vendorFilter} setVendorFilter={setVendorFilter} setQuickShop={setQuickShop} items={items} storeRef={storeRef} displayImages={displayImages} />
      <UpcomingDrops blurImages={blurImages} censored={censored} setCensored={setCensored} stockFilter={stockFilter} setStockFilter={setStockFilter} typeFilter={typeFilter} setTypeFilter={setTypeFilter} vendorFilter={vendorFilter} setVendorFilter={setVendorFilter} setQuickShop={setQuickShop} items={items} storeRef={storeRef} displayImages={displayImages} />
      <Reviews reviews={reviews}/>
    </div>
  )
}

export default Home