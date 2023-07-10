import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = ({ setCartOpened, storeRef }) => {
  const location = useLocation().pathname
  const navigate = useNavigate()
  
  return (
    <div className='h-wrapper'>
      <div className='header'>
        <div className='left-lane'>
          <a href='/'>LOOT MAKERS</a>
        </div>
        <div className='mid-lane'>
          <a onClick={() => {
            location === "/" ? 
              storeRef.current?.scrollIntoView({behavior: "smooth"})
            :
              navigate("/")
              setTimeout(() => storeRef.current?.scrollIntoView({behavior: "smooth"}), 100)
          }}>
            STORE
          </a>
          <a>ABOUT<div className='more'><div className='wing-1'></div><div className='wing-2'></div></div></a>
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