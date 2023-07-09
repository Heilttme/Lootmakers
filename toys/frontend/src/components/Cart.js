import React, { useEffect } from 'react'
import { motion } from "framer-motion"
import axios from 'axios'
import useStore from "../store";

const Cart = ({ displayImages, cart, setCartOpened, blockScroll, cartOpened }) => {
  const addToCart = useStore(state => state.add)
  const removeFromCart = useStore(state => state.remove)
  const incQuantity = useStore(state => state.increment)
  const decQuantity = useStore(state => state.decrement)
  
  useEffect(() => {
    cartOpened && blockScroll()
  }, [cartOpened])

  const cartItems = cart.map(item => (
    <div className='item'>
      <div className='item-inner'>
        <div className='i-nq'>
          <img src={`http://127.0.0.1:8000${displayImages.length && displayImages.filter(image => image.item === item.id)[0].image}`}/>
          <div className='n-q'>
            <h1>{item.collection}</h1>
            <h1>{item.name}</h1>
            <div className='quantity'>
              <button onClick={() => decQuantity(item)}>-</button>
              <p>{item.quantity}</p>
              <button onClick={() => incQuantity(item)}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div className='remove'>
        <button className='remove-btn' onClick={() => removeFromCart(item)}>REMOVE</button>
      </div>
    </div>
  ))
  
  return (
    <motion.div 
      initial={{x: 5000}}
      animate={{x: cartOpened ? 0 : 5000}}
      transition={{x: {type: "tween"}}}
      className='cart'
    >
      <div className='cart-header'>
        <h1>CART</h1>
        <svg className='leave' onClick={() => setCartOpened(false)} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20 20h-15.25c-.414 0-.75.336-.75.75s.336.75.75.75h15.75c.53 0 1-.47 1-1v-15.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm-1-17c0-.478-.379-1-1-1h-15c-.62 0-1 .519-1 1v15c0 .621.52 1 1 1h15c.478 0 1-.379 1-1zm-8.503 6.437 2.219-2.22c.146-.146.338-.219.53-.219.404 0 .751.325.751.75 0 .193-.073.384-.219.531l-2.22 2.22 2.222 2.222c.147.147.22.339.22.53 0 .427-.349.751-.75.751-.192 0-.385-.073-.531-.219l-2.222-2.223-2.223 2.223c-.146.146-.338.219-.53.219-.401 0-.751-.324-.751-.751 0-.191.073-.383.22-.53l2.222-2.222-2.219-2.22c-.146-.147-.219-.338-.219-.531 0-.425.346-.75.75-.75.192 0 .384.073.53.219z" fill-rule="nonzero"/></svg>
      </div>
      <div className='cart-items'>
        {cartItems}
      </div>
    </motion.div>
  )
}

export default Cart