import axios from 'axios'
import { t } from 'i18next'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../store'
import ItemPageSlider from "./ItemPageSlider"
import ItemsSlider from "./ItemsSlider"
import { motion } from "framer-motion"
import useWindowDimensions from "./useWindowDimensions"

const Item = ({ buttonRef, addToCart, cart, items }) => {
  const { id } = useParams()
  const [curItem, setCurItem] = useState(items.filter(i => i.id === id)[0])
  const [mapped3DImages, setMapped3DImages] = useState([])
  const [imageList, setImageList] = useState([])
  const [images3D, setImages3D] = useState([])
  const { height, width } = useWindowDimensions()
  const [parentWidth, setParentWidth] = useState()
  
  const slides = [mapped3DImages, ...imageList.map(item => item.image)]

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  useEffect(() => {
    setCurItem(items.filter(i => parseInt(i.id) === parseInt(id))[0])
  }, [items, id])
  
  useEffect(() => {
    setMapped3DImages(images3D.map(item => item.image))
  }, [images3D])

  useEffect(() => {
    const res1 = axios.post("http://127.0.0.1:8000/api/get_item_3d_images/", {id: id}).then(data => setImages3D(data.data.data))
    const res2 = axios.post("http://127.0.0.1:8000/api/get_item_images/", {id: id}).then(data => setImageList(data.data.data))
  }, [id])

  useEffect(() => {
    let w = 600
    if (width <= 1500) {
      w = 500
      
      if (width <= 1300) {
        w = 400

        if (width <= 1100) {
          w = 330

          if (width <= 700) {
            w = 400

            if (width <= 550) {
              w = 340

              if (width <= 450) {
                w = 300
                
                if (width <= 380) {
                  w = 260

                  if (width <= 320){
                    w = 220
                  }
                }
              }
            }
          }
        } 
      }
    } 
    setParentWidth(w)
  }, [width])


  return curItem && (
    <div className='item-page'>
      <div className='image-slider-container'>
        {
          width > 700 ?
          <ItemPageSlider mapped3DImages={mapped3DImages} item={curItem} slides={slides} parentWidth={parentWidth} />
          :
          <ItemsSlider mapped3DImages={mapped3DImages} item={curItem} slides={slides} parentWidth={parentWidth} />
        }
      </div>
      <div className='s-col'>
        <h3>{curItem.collection}</h3>
        <h2>{curItem.name}</h2>
        <h1>${curItem.price}</h1>
        <div className='block-info'>
          {curItem.blockInfo.split(";").map(bl => (
            <div className='line'>
              <div className='l'>{t(bl.split(":")[0])}</div>
              <div className='r'>{t(bl.split(":")[1])}</div>
            </div>
          ))}
        </div>
        <div className='main-text'>
          <p>{curItem.mainText}</p>
        </div>
        <div className='quote'>
          <h2>"{curItem.quote}"</h2>
          <h2 className='said'>©{curItem.author}</h2>
        </div>
        <button ref={buttonRef} onClick={() => addToCart(curItem)}>{t("ADD TO CART")}</button>
      </div>
    </div>
  )
}

export default Item