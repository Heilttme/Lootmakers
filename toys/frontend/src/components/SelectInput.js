import React, { useState } from 'react'
import { motion } from "framer-motion"
import { t } from 'i18next'

const SelectInput = ({ label, setItemFormData, itemFormData, onChange, value, error, setError, options }) => {
  const [focus, setFocus] = useState(false)

  return (
      <div className='field'>
        <div className='search-block'>
            <span>
                {value}
            </span>
            {
              focus ?
              
              <div className='drop'>
                {options.filter(item => item.includes(itemFormData.type)).map(item => <div className='item' onClick={() => setItemFormData(prev => ({...prev, type: item}))}>{item}</div>)}
              </div>

              : <></>
            }
        </div>
        <motion.label animate={(itemFormData.type || focus) ? {y: -30, x: -15, fontSize: "16px", color: !error ? "rgb(0, 0, 0)" : "rgb(247, 61, 61)"} : {color: !error ? "rgb(255, 255, 255)" : "rgb(247, 61, 61)"}} transition={{color: {stiffness: 100}}} className={`text-label${ error ? " error" : ""}`} htmlFor={label}>{t(label.slice(0, 1).toUpperCase() + label.slice(1, label.length))}</motion.label>
      </div>
  )
}

export default SelectInput