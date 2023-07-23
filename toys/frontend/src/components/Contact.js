import React from 'react'
import { t } from "i18next"

const Contact = ({ setContactOpened }) => {
  return (
    <div className='contact'>
      <div className='pre'>
        <h1>{t("Let's get with each other")}</h1>
        <p>{t("Complete this short form so we can get to know you better")}</p>
        <button onClick={() => setContactOpened(true)}>{t("GET STARTED")}</button>
      </div>
    </div>
  )
}

export default Contact