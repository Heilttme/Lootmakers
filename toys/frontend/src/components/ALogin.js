import React, { useState } from 'react'
import { motion } from "framer-motion"

const ALogin = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: ""
  })

  const changeFormData = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const [loginFocus, setLoginFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [loginError, setLoginError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const submit = () => {

  }
  
  return (
    <div className='login-form'>
      <div>
        <div className="field">
          <input 
            name='login'
            onChange={e => changeFormData(e)}
            id="login"
            value={formData.login}
            onFocus={() => {setLoginFocus(true);setLoginError(false)}}
            onBlur={() => setLoginFocus(false)}
          />
          <motion.label animate={(formData.login || loginFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ loginError ? " error" : ""}`} htmlFor="login">Login</motion.label>
        </div>
        <div className="field">
          <input 
            name='password'
            onChange={e => changeFormData(e)}
            id="password"
            value={formData.password}
            onFocus={() => {setPasswordFocus(true);setPasswordError(false)}}
            onBlur={() => setPasswordFocus(false)}
          />
          <motion.label animate={(formData.password || passwordFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ passwordError ? " error" : ""}`} htmlFor="password">Password</motion.label>
        </div>
      </div>
    </div>
  )
}

export default ALogin