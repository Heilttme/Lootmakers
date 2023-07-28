import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import i18next, { t } from 'i18next'
import { motion } from "framer-motion"

const MobileNav = ({ menuOpened, setMenuOpened, allowScroll, blockScroll, cart, changeLanguage, setCartOpened, storeRef, cartCounterRef }) => {
  const location = useLocation().pathname
  const navigate = useNavigate()

  useEffect(() => {
    if (menuOpened) {
      blockScroll()
    }
  }, [menuOpened])
    
  return (
    <>
      <div onClick={() => setMenuOpened(prev => !prev)} className='hamburger-wrapper'>
        <div className='hamburger'>
          <div className='line line-1'/>
          <div className='line line-2'/>
          <div className='line line-3'/>
        </div>
      </div>
      <motion.div
        initial={{x: 800}}
        animate={{x: menuOpened ? 0 : 800}}
        transition={{type: "keyframes"}}
        className='side-menu'
        onClick={(e) => e.stopPropagation()} 
      >
        <div onClick={() => setMenuOpened(false)} className='cross-wrapper'>
          <div className='cross'>
            <div className='line line-1'/>
            <div className='line line-2'/>  
          </div>
        </div>
        <div className='block'>
          <a href='/' className='top-nav'>Loot Makers</a>
        </div>
        <div className='block'>
          <a href='/' className='nav'>{t("STORE")}</a>
        </div>
        <div className='block'>
          <a className='nav'>{t("ABOUT")}</a>
        </div>
        <div className='block'>
          <a href='/contact' className='nav'>{t("CONTACT")}</a>
        </div>
        <div onClick={() => {setCartOpened(prev => !prev);setTimeout(() => setMenuOpened(false), 200)}} className='cart-container'>
            <a className='nav'>
              {t("CART")}
              {
                cart.length !== 0 &&
                <p ref={cartCounterRef} className='count'>{cart.reduce((c, i) => c + i.quantity, 0)}</p>
              }
            </a>
          </div>
        <div className='block'>
          <a onClick={() => changeLanguage(i18next.language === "ru" ? "en" : "ru")} className='nav'>{i18next.language === "ru" ? "RU" : "EN"}</a>
        </div>
      </motion.div>
    </>
  )
}

export default MobileNav