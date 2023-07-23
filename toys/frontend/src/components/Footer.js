import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { t } from "i18next"

const Footer = ({ storeRef }) => {
  const location = useLocation().pathname
  const navigate = useNavigate()

  
  return (
    <div className='footer'>
      <div className='top'>
        <div className='col'>
          <h2>{t("Info")}</h2>
          <a onClick={() => {
            location === "/" ? 
              storeRef.current?.scrollIntoView({behavior: "smooth"})
            :
              navigate("/")
              setTimeout(() => storeRef.current?.scrollIntoView({behavior: "smooth"}), 100)
          }}>{t("Store")}</a>
          <a>{t("About")}</a>
          <a href='/contact'>{t("Contact us")}</a>
        </div>
        <div className='col'>
          <h2>LootMakers</h2>
          <a>Telegram</a>
          <a>Instagram</a>
          <a>VK</a>
        </div>
        <div className='col'>
          <h2>{t("Info")}</h2>
          <a>{t("How it's made")}</a>
          <a>{t("Public oferta")}</a>
          <a>{t("Company Policy")}</a>
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