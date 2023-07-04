import React, { useEffect } from 'react'
import { motion } from "framer-motion"

const QuickShop = ({ blockScroll, id }) => {

  useEffect(() => {
    id && blockScroll()
  }, [id])

  return (
    <motion.div 
      initial={{opacity: 0, display: "none"}}
      animate={{opacity: id ? 1 : 0}}
      
      className='quickshop'
    >

    </motion.div>
  )
}

export default QuickShop