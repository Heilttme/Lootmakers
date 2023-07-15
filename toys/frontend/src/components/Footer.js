import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Footer = ({ storeRef }) => {
  const location = useLocation().pathname
  const navigate = useNavigate()

  
  return (
    <div className='footer'>
      <div className='top'>
        <div className='col'>
          <h2>Info</h2>
          <a onClick={() => {
            location === "/" ? 
              storeRef.current?.scrollIntoView({behavior: "smooth"})
            :
              navigate("/")
              setTimeout(() => storeRef.current?.scrollIntoView({behavior: "smooth"}), 100)
          }}>Store</a>
          <a>About</a>
          <a href='/contact'>Contact us</a>
        </div>
        <div className='col'>
          <h2>LootMakers</h2>
          <a>Telegram</a>
          <a>Instagram</a>
          <a>VK</a>
        </div>
        <div className='col'>
          <h2>Info</h2>
          <a>How it's made</a>
          <a>Public oferta tupa</a>
          <a>Company Policy</a>
        </div>
      </div>
      <div className='bottom'>
        <div className='col'>
          <p>2023 © ООО «Лут Мейкерс»</p>
        </div>
        <div className='col'>
          <p>LootMakers@loot.com</p>
        </div>
      </div>
    </div>
  )
}

export default Footer