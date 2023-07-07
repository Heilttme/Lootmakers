import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import ImageSlider from './ItemsSlider'
import axios from 'axios'

const QuickShop = ({ items, blockScroll, setQuickShop, id }) => {
  const [item, setItem] = useState(items.filter(i => i.id === id)[0])
  const [imageList, setImageList] = useState([])
  const [images3D, setImages3D] = useState([])
  const [mapped3DImages, setMapped3DImages] = useState([])

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

  return item && (
    <motion.div 
      initial={{x: 5000}}
      animate={{x: id ? 0 : 5000}}
      transition={{x: {type: "tween"}}}
      className='quickshop'
    >
      <div className='quickshop-header'>
        <h1>QUICK///SHOP\\\</h1>
        <svg className='leave' onClick={() => setQuickShop(false)} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20 20h-15.25c-.414 0-.75.336-.75.75s.336.75.75.75h15.75c.53 0 1-.47 1-1v-15.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm-1-17c0-.478-.379-1-1-1h-15c-.62 0-1 .519-1 1v15c0 .621.52 1 1 1h15c.478 0 1-.379 1-1zm-8.503 6.437 2.219-2.22c.146-.146.338-.219.53-.219.404 0 .751.325.751.75 0 .193-.073.384-.219.531l-2.22 2.22 2.222 2.222c.147.147.22.339.22.53 0 .427-.349.751-.75.751-.192 0-.385-.073-.531-.219l-2.222-2.223-2.223 2.223c-.146.146-.338.219-.53.219-.401 0-.751-.324-.751-.751 0-.191.073-.383.22-.53l2.222-2.222-2.219-2.22c-.146-.147-.219-.338-.219-.531 0-.425.346-.75.75-.75.192 0 .384.073.53.219z" fill-rule="nonzero"/></svg>
      </div>
      <div className='item'>
        <div className='f-col'>
        <div className='image-slider-container'>
          <ImageSlider mapped3DImages={mapped3DImages} item={item} slides={slides} parentWidth={300} />
        </div>
        </div>
        <div className='r-col'>
          <h3>{item.collection}</h3>
          <h2>{item.name}</h2>
          <h1>${item.price}.99</h1>
          <div className='block-info'>
            {item.blockInfo.split(";").map(bl => (
              <div className='line'>
                <div className='l'>{bl.split(":")[0]}</div>
                <div className='r'>{bl.split(":")[1]}</div>
              </div>
            ))}
          </div>
          <div className='quote'>
            <h2>"I think he has something he should say to me."</h2>
            <h2 className='said'>©Craig</h2>
          </div>
          <button>ADD TO CART</button>
        </div>
      </div>
    </motion.div>
  )
}

export default QuickShop