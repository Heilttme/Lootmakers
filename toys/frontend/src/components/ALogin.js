import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import Input from "./Input"
import axios from 'axios'

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

  const navigate = useNavigate()
  
  const [loginError, setLoginError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const submit = () => {

    if (true) {
      const res = axios.post().then(data => {
        localStorage.setItem("access", )
        localStorage.setItem("refresh", )
      })
    }
    navigate("/admin/cms")
  }
  
  return (
    <div className='login-form'>
      <div className='form'>
        <Input question={""} label={"login"} onChange={(e) => changeFormData(e)} value={formData.login} error={loginError} setError={setLoginError} />
        <Input question={""} label={"password"} onChange={(e) => changeFormData(e)} value={formData.password} error={passwordError} setError={setPasswordError} />
        <div className='btn-container'>
          <button onClick={submit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default ALogin