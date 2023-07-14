import axios from 'axios'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../store'
import ImageSlider from "./ItemsSlider"

const Item = ({ items }) => {
  const { id } = useParams()
  const [curItem, setCurItem] = useState(items.filter(i => i.id === id)[0])
  const [mapped3DImages, setMapped3DImages] = useState([])
  const [imageList, setImageList] = useState([])
  const [images3D, setImages3D] = useState([])
  const addToStateCart = useStore(state => state.add)
  
  const slides = [mapped3DImages, ...imageList.map(item => item.image)]
  
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

  const addToCart = (id) => {
    addToStateCart(items.filter(i => i.id === id)[0])
  }

  return curItem && (
    <div className='item-page'>
      <div className='image-slider-container'>
        <ImageSlider mapped3DImages={mapped3DImages} item={curItem} slides={slides} parentWidth={500} />
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
        <div className='quote'>
          <h2>"I think he has something he should say to me."</h2>
          <h2 className='said'>©Craig</h2>
        </div>
        <button onClick={() => addToCart(id)}>{t("ADD TO CART")}</button>
      </div>
    </div>
  )
}

export default Item