import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const AgeRestriction = ({ blockScroll, allowScroll, ageRestriction, setAgeRestriction }) => {
  const navigate = useNavigate()
  
  useEffect(() => {
    blockScroll()

    return () => allowScroll()
  }, [])
  
  return (
    <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: ageRestriction ? 1 : 0}}
      transition={{delay: ".1"}}
      className='restriction'
    >
      <div className='age'>
        <h1>18+</h1>
      </div>
      <div className='text'>
        <p>This content has an age restriction</p>
      </div>
      <div className='buttons'>
        <button onClick={() => setAgeRestriction(false)}>Enter</button>
        <button onClick={() => {setAgeRestriction(false); navigate("/")}}>Exit</button>
      </div>
    </motion.div>
  )
}

export default AgeRestriction