import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import ImageSlider from './ItemsSlider'
import axios from 'axios'
import useStore from "../store"
import { t } from "i18next"
import useWindowDimensions from './useWindowDimensions'

const QuickShop = ({ buttonRef, addToCart, cart, items, blockScroll, allowScroll, setQuickShop, id }) => {
  const [item, setItem] = useState(items.filter(i => i.id === id)[0])
  const [imageList, setImageList] = useState([])
  const [images3D, setImages3D] = useState([])
  const [mapped3DImages, setMapped3DImages] = useState([])
  const addToStateCart = useStore(state => state.add)
  const [parentWidth, setParentWidth] = useState(0)
  const { height, width } = useWindowDimensions()

  useEffect(() => {
    setItem(items.filter(i => i.id === id)[0])
  }, [items, id])

  useEffect(() => {
    id && blockScroll()
  }, [id])

  useEffect(() => {
    const res1 = axios.post("http://127.0.0.1:8000/api/get_item_3d_images/", {id: id}).then(data => setImages3D(data.data.data))
    const res2 = axios.post("http://127.0.0.1:8000/api/get_item_images/", {id: id}).then(data => setImageList(data.data.data))
  }, [id])

  useEffect(() => {
    setMapped3DImages(images3D.map(item => item.image))
  }, [images3D])

  const slides = [mapped3DImages, ...imageList.map(item => item.image)]

  useEffect(() => {
    let w = 380
    if (width <= 900) {
      w = 300
        
    } 
    setParentWidth(w)
  }, [width])

  return item && (
    <motion.div 
      initial={{x: 5000}}
      animate={{x: id ? 0 : 5000}}
      transition={{x: {type: "tween"}}}
      className='quickshop'
    >
      <div className='quickshop-header'>
        <p>{t("QUICK SHOP")}</p>
        <svg className='leave' onClick={() => {setQuickShop(null);allowScroll()}} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-8.991 6.932 2.717-2.718c.146-.146.338-.219.53-.219.405 0 .751.325.751.75 0 .193-.073.384-.219.531l-2.718 2.717 2.728 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.531-.219l-2.728-2.728-2.728 2.728c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .384.073.53.219z" fill-rule="nonzero"/></svg>
      </div>
      <div className='item-wrapper'>
        <div className='item'>
          <div className='f-col'>
            <div className='image-slider-container'>
              <ImageSlider mapped3DImages={mapped3DImages} item={item} slides={slides} parentWidth={parentWidth} />
            </div>
          </div>
          <div className='r-col'>
            <h3>{item.collection}</h3>
            <h2>{item.name}</h2>
            <h1>${item.price}</h1>
            <div className='block-info'>
              {item.blockInfo.split(";").map(bl => (
                <div className='line'>
                  <div className='l'>{t(bl.split(":")[0])}</div>
                  <div className='r'>{t(bl.split(":")[1])}</div>
                </div>
              ))}
            </div>
            <div className='quote'>
              <h2>"I think he has something he should say to me."</h2>
              <h2 className='said'>©Craig</h2>
            </div>
            <button ref={buttonRef} onClick={() => addToCart(item)}>{t("ADD TO CART")}</button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default QuickShop