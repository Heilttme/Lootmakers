import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import Input from "./Input"
import axios from 'axios'
import { t } from 'i18next'
import { toast } from 'react-toastify'

const ALogin = ({ setAuthorized }) => {
  const [formData, setFormData] = useState({
    login: "",
    username: "",
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
  
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)

  const submit = () => {
    const res = axios.post("http://127.0.0.1:8000/auth/jwt/create/", {email: formData.login, password: formData.password})
    .then(data => {
      setAuthorized(true)
      localStorage.setItem("access", data.data.access)
      localStorage.setItem("refresh", data.data.refresh)
      navigate("/admin/cms")
    })
    .catch(data => {
      console.log(data);
      toast.error(t("Error"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      })
    })
  }
  
  return (
    <div className='login-form'>
      <div className='form'>
        <Input question={""} label={"email"} onChange={(e) => changeFormData(e)} value={formData.email} error={emailError} setError={setEmailError} />
        {/* <Input question={""} label={"username"} onChange={(e) => changeFormData(e)} value={formData.username} error={usernameError} setError={setUsernameError} /> */}
        <Input question={""} label={"password"} onChange={(e) => changeFormData(e)} value={formData.password} error={passwordError} setError={setPasswordError} />
        <div className='btn-container'>
          <button onClick={submit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default ALogin