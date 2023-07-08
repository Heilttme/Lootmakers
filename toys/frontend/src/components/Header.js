import React from 'react'

const Header = ({ setCartOpened, storeRef }) => {
  return (
    <div className='h-wrapper'>
      <div className='header'>
        <div className='left-lane'>
          <a>LOOT MAKERS</a>
        </div>
        <div className='mid-lane'>
          <a onClick={() => storeRef.current?.scrollIntoView({behavior: "smooth"})}>STORE</a>
          <a>ABOUT</a>
          <a>CONTACT</a>
        </div>
        <div className='right-lane'>
          <a onClick={() => setCartOpened(prev => !prev)}>CART</a>
          <a>RU</a>
        </div>
      </div>
    </div>
  )
}

export default Header