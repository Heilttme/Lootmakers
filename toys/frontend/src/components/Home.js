import React from 'react'
import Reviews from "./Reviews"
import IVAN from "../assets/IVAN.png"
import Store from './Store'

const Home = ({ reviews, items, storeRef }) => {
  return (
    <div className='home'>
      <div className='gr-image'>
        <img src={IVAN}/>
      </div>
      <Store items={items} storeRef={storeRef} />
      <Reviews reviews={reviews}/>
    </div>
  )
}

export default Home