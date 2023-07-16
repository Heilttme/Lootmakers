import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import axios from 'axios'
import useStore from "../store";
import { useNavigate } from 'react-router-dom';

const Cart = ({ items, displayImages, setCartOpened, blockScroll, cartOpened, allowScroll }) => {
  const addToCart = useStore(state => state.add)
  const incQuantity = useStore(state => state.increment)
  const decQuantity = useStore(state => state.decrement)
  const navigate = useNavigate()
  const cart = useStore(state => state.cart)
  
  useEffect(() => {
    cartOpened && blockScroll()
  }, [cartOpened])

  const cartItems = cart.map(item => (
    <CartItem key={item.id} items={items} cart={cart} item={item} displayImages={displayImages} setCartOpened={setCartOpened} incQuantity={incQuantity} decQuantity={decQuantity}/>
  ))
  
  return (
    <motion.div 
      initial={{x: 3000}}
      animate={{x: cartOpened ? 0 : 3000}}
      transition={{x: {type: "tween"}}}
      className='cart'
    >
        <div className='cart-header'>
          <p>CART</p>
          <svg className='leave' onClick={() => {setCartOpened(false);allowScroll()}} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-8.991 6.932 2.717-2.718c.146-.146.338-.219.53-.219.405 0 .751.325.751.75 0 .193-.073.384-.219.531l-2.718 2.717 2.728 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.531-.219l-2.728-2.728-2.728 2.728c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .384.073.53.219z" fill-rule="nonzero"/></svg>
        </div>
      <div className='wrapper'>
        <div className='cart-items'>
          {cartItems}
        </div>
      </div>
    </motion.div>
  )
}

const CartItem = ({ items, item, displayImages, setCartOpened, incQuantity, decQuantity }) => {
  const navigate = useNavigate()
  const [removedShadow, setRemovedShadow] = useState(false)
  const [removedItem, setRemovedItem] = useState(false)
  const removeFromCart = useStore(state => state.remove)

  // const startRemoving = (item) => {
  //   setRemovedShadow(true)
  //   setRemovedShadow(false)
  //   setRemovedItem(true)
  //   setTimeout(() => setRemovedItem(true), 200)
  //   setTimeout(() => {
  //     let Citems = JSON.parse(localStorage.getItem("i"))
  //     Citems = Citems.filter(i => parseInt(i.id) !== parseInt(item.id))
  //     localStorage.setItem("i", JSON.stringify([...Citems]))
  //     removeFromCart(items.filter(i => i.id === item.id)[0])
  //   }, 450)
  // }

  const startRemoving = (item) => {
    setRemovedShadow(true)
    setTimeout(() => {
      setRemovedShadow(false)
      setRemovedItem(true)
      // setTimeout(() => setRemovedItem(true), 200)
      setTimeout(() => {
        let Citems = JSON.parse(localStorage.getItem("i"))
        Citems = Citems.filter(i => parseInt(i.id) !== parseInt(item.id))
        localStorage.setItem("i", JSON.stringify([...Citems]))
        removeFromCart(items.filter(i => i.id === item.id)[0])
      }, 450)
    }, 5000)
  }
  
  return (
    <motion.div
      animate={{height: removedItem ? "0" : "auto"}}
      className='item-wrapper'
    >
      <motion.div
        animate={{filter: removedShadow ? "brightness(.25)" : "", pointerEvents: removedShadow ? "none" : "", userSelect: removedShadow ? "none" : ""}}
        transition={{duration: ".5"}}
        className='item'
      >
        <div className='item-inner'>
          <div className='i-nq'>
            <img onClick={() => {navigate(`/items/${item.id}`);setCartOpened(false)}} src={`http://127.0.0.1:8000${displayImages.length && displayImages.filter(image => image.item === item.id)[0].image}`}/>
            <div className='n-q'>
              <div>
                <h2>{item.collection}</h2>
                <h1>{item.name}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className='remove'>
          <div className='quantity'>
            <button onClick={() => decQuantity(item)}>-</button>
            <p>{item.quantity}</p>
            <button onClick={() => incQuantity(item)}>+</button>
          </div>
          <button className='remove-btn' onClick={() => startRemoving(item)}>REMOVE</button>
        </div>
      </motion.div>
      {
        removedShadow && 
          <div className='remove-warn'>
            <div></div>
            <h2>You sure you want to remove this item?</h2>
            <div className='buttons'>
              <button onClick={() => setRemovedShadow(false)}>Undo</button>
            </div>
          </div>
      }
      {
        removedShadow && 
          <motion.div
            initial={{width: "100%"}}
            animate={{width: "0%"}}
            transition={{duration: "5", stiffness: 100}}
            className='line'
          />
      }
    </motion.div>
  )
}

export default Cart