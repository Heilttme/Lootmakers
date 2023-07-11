import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import i18next, { t } from 'i18next'

const Header = ({ changeLanguage, setCartOpened, storeRef }) => {
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
            {t("STORE")}
          </a>
          <a>{t("ABOUT")}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg></a>
          <a href='/contact'>{t("CONTACT")}</a>
        </div>
        <div className='right-lane'>
          <a onClick={() => setCartOpened(prev => !prev)}>{t("CART")}</a>
          <a onClick={() => changeLanguage(i18next.language === "ru" ? "en" : "ru")}>{i18next.language === "ru" ? "RU" : "EN"}</a>
        </div>
      </div>
    </div>
  )
}

export default Header