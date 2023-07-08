import React from 'react'
import { motion } from "framer-motion"
import axios from 'axios'

const Cart = ({ setCartOpened, cartOpened }) => {
  return (
    <motion.div 
      initial={{x: 5000}}
      animate={{x: id ? 0 : 5000}}
      transition={{x: {type: "tween"}}}
      className='quickshop'
    >
      
    </motion.div>
  )
}

export default Cart