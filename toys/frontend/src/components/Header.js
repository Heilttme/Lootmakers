import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import i18next, { t } from 'i18next'
import { motion } from "framer-motion"

const Header = ({ allowScroll, blockScroll, cart, changeLanguage, setCartOpened, storeRef, cartCounterRef, block, setBlock }) => {
  const [menuOpened, setMenuOpened] = useState(false)
  const location = useLocation().pathname
  const navigate = useNavigate()

  return (
    <div className='h-wrapper'>
      <div className='header'>
        <div className='left-lane'>
          <a className='nav' href='/'>LOOT MAKERS</a>
        </div>
        <div className='mid-lane'>
          <a className='nav' onClick={() => {
            location === "/" ? 
              storeRef.current?.scrollIntoView({behavior: "smooth"})
            :
              navigate("/")
              setTimeout(() => storeRef.current?.scrollIntoView({behavior: "smooth"}), 100)
          }}>
            {t("STORE")}
          </a>
          <div className='about-wrapper'>
            <div className='slide-out'>
              <a href='/archive' className='block'>{t("Archive")}</a>
              <a className='block'>{t("About us")}</a>
              <a className='block'>{t("How it's made")}</a>
              <a className='block'>{t("Public oferta")}</a>
              <a className='block'>{t("Company Policy")}</a>
              <a className='block'>{t("FAQ")}</a>
            </div>
            <a className='nav about'>
              {t("ABOUT")}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
            </a>
          </div>
          <a className='nav' href='/contact'>{t("CONTACT")}</a>
        </div>
        <div className='right-lane'>
          <div onClick={() => setCartOpened(prev => !prev)} className='cart-container'>
            <a className='nav'>
              {t("CART")}
              {
                cart.length !== 0 &&
                <p ref={cartCounterRef} className='count'>{cart.reduce((c, i) => c + i.quantity, 0)}</p>
              }
            </a>
          </div>
          <a className='nav' onClick={() => changeLanguage(i18next.language === "ru" ? "en" : "ru")}>{i18next.language === "ru" ? "RU" : "EN"}</a>
        </div>
        <div className='blocks'>
            
        </div>
      </div>
    </div>
  )
}

export default Header