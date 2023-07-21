import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Input = ({ label, onChange, value, error, setError, question }) => {
  const [inputFocus, setInputFocus] = useState(false)
  
  return (
    <div className={`field ${question !== "" && " flex"}`}>
      <input 
        name={label}
        onChange={onChange}
        id={label}
        value={value}
        type={(label === "price" || label === "quantityAvailable") ? "number" : "text"}
        onFocus={() => {setInputFocus(true);setError(false)}}
        onBlur={() => setInputFocus(false)}
      />
      <motion.label animate={(value || inputFocus) ? {y: -30, x: -15, fontSize: "16px", color: !error ? "rgb(0, 0, 0)" : "rgb(247, 61, 61)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ error ? " error" : ""}`} htmlFor={label}>{label.slice(0, 1).toUpperCase() + label.slice(1, label.length)}</motion.label>
      {
        question !== "" &&
        <div data-hover={question} className='question-mark'>
          <div className='question-wrapper'>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"/></svg>
          </div>
        </div>
      }
    </div>
  )
}

export default Input