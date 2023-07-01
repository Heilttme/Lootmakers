import React from 'react'

const Header = ({ storeRef }) => {
  return (
    <div className='h-wrapper'>
      <div className='header'>
        <div className='left-lane'>
          <a>NIGGA-BALLS</a>
        </div>
        <div className='mid-lane'>
          <a onClick={() => storeRef.current?.scrollIntoView({behavior: "smooth"})}>STORE</a>
          <a>ABOUT</a>
          <a>CONTACT</a>
        </div>
        <div className='right-lane'>
          <a>CART</a>
          <a>RU</a>
        </div>
      </div>
    </div>
  )
}

export default Header