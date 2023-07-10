import React from 'react'
import Reviews from "./Reviews"
import BRUT from "../assets/BRUT.png"
import Store from './Store'

const Home = ({ setQuickShop, reviews, items, storeRef, displayImages }) => {
  return (
    <div className='home'>
      <div className='gr-image'>
        {/* <img src={BRUT}/> */}
      </div>
      <Store setQuickShop={setQuickShop} items={items} storeRef={storeRef} displayImages={displayImages} />
      <Reviews reviews={reviews}/>
    </div>
  )
}

export default Home