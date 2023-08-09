import React, { useState } from 'react'
import { motion } from "framer-motion"

const Input = ({ value, onChange, setFormData, setCityFocus, cityFocus, cityError, setcityError }) => {
  const cities = {cities: ["stavropol", "moscow", "saint-petersburg", "stavropol", "moscow", "saint-petersburg", "stavropol", "moscow", "saint-petersburg", "stavropol", "moscow", "saint-petersburg", "stavropol", "moscow", "saint-petersburg", "stavropol", "moscow", "saint-petersburg", ]}

  return (
      <div className='field'>
        <div className='search-block'>
            <input
                onChange={onChange}
                value={value}
                name="city"
                id="city"
                onFocus={() => {setCityFocus(true);setcityError(false)}}
                onBlur={() => setTimeout(() => setCityFocus(false), 200)}
            />
            {
              cityFocus ?
              
              <div className='drop'>
                {cities.cities.filter(item => item.includes(value)).map(item => <div className='item' onClick={() => setFormData(prev => ({...prev, city: item}))}>{item}</div>)}
              </div>

              : <></>
            }
        </div>
        <motion.label animate={value || cityFocus ? {y: -30, x: -15, fontSize: "16px"} : {}} className={`text-label${ cityError ? " error" : ""}`} htmlFor="city">{t(label.slice(0, 1).toUpperCase() + label.slice(1, label.length))}</motion.label>
      </div>
  )
}

export default Input