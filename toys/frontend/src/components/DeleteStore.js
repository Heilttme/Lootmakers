import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useWindowDimensions from './useWindowDimensions'
import { motion } from "framer-motion"
import { t } from 'i18next'

const DeleteStore = ({ items, displayImages }) => {
  const [oneLineItems, setOneLineItems] = useState([])
  const [twoLineItems, setTwoLineItems] = useState([])
  const [threeLineItems, setThreeLineItems] = useState([])
  const { height, width } = useWindowDimensions()

  useEffect(() => {
    const newItems = []
    let newAr = [] 
    for (let i = 0; i < items.length; i++) {
      newAr.push(items[i])
      if (newAr.length === 3) {
        newItems.push(newAr)
        newAr = []
      }
    }
    newItems.push(newAr)
    setThreeLineItems(newItems)
  }, [items])

  useEffect(() => {
    const newItems = []
    let newAr = [] 
    for (let i = 0; i < items.length; i++) {
      newAr.push(items[i])
      if (newAr.length === 2) {
        newItems.push(newAr)
        newAr = []
      }
    }
    newItems.push(newAr)
    setTwoLineItems(newItems)
  }, [items])

  useEffect(() => {
    const newItems = []
    let newAr = [] 
    for (let i = 0; i < items.length; i++) {
      newAr.push(items[i])
      if (newAr.length === 1) {
        newItems.push(newAr)
        newAr = []
      }
    }
    newItems.push(newAr)
    setOneLineItems(newItems)
  }, [items])

  const threeItemsDisplay = width > 1000 ? threeLineItems.map(item => (
    <div className='block'>
      {item.map(itemNew => 
      <>
        <ItemStore item={itemNew} displayImages={displayImages}/>
      </>
      )}
    </div>
  )) 
  : width > 600 ?
    twoLineItems.map(item => (
      <div className='block'>
        {item.map(itemNew => 
        <>
          <ItemStore item={itemNew} displayImages={displayImages}/>
        </>
        )}
      </div>
    ))
  : 
  oneLineItems.map(item => (
    <div className='block'>
      {item.map(itemNew => 
      <>
       <ItemStore item={itemNew} displayImages={displayImages}/>
      </>
      )}
    </div>
  ))

  let newItems = items.map(it => <ItemStore item={it} displayImages={displayImages}/>)

  const [filter, setFilter] = useState(-1)
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
    if (filter !== -1) {
      newItems = items.filter(it => (it.id === parseInt(filter) || it.name.toLowerCase().includes(filter.toLowerCase()))).map(it => <ItemStore item={it} displayImages={displayImages}/>)
    }
    setFilteredItems(newItems)
  }, [filter])

  const [filterFocus, setFilterFocus] = useState(false)

  return (
    <div className='delete-store'>
        <div className='filter'>
          <input 
            name='filter'
            value={filter === -1 ? "" : filter}
            onChange={(e) => setFilter(e.target.value)}
            id="filter"
            onFocus={() => setFilterFocus(true)}
            onBlur={() => setFilterFocus(false)}
          />
          <motion.label animate={((filter && filter !== -1) || filterFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label`} htmlFor={`filter`}>{t("Filter")}</motion.label>
        </div>
        <div className='items'>
          {filteredItems}
        </div>
    </div>
  )
}


const ItemStore = ({ displayImages, item }) => {
  const navigate = useNavigate()
  const [collapse, setCollapse] = useState()

  const removeItem = (id) => {
    const res = axios.post("http://127.0.0.1:8000/api/remove_item/", {id})

    setTimeout(() => {
      setCollapse(true)
    }, 300)
  }

  return (
    <div className='wrapper-item'>
      <motion.div initial={{height: "auto"}} animate={{height: collapse ? 0 : "auto"}} transition={{duration: '.5'}} onClick={() => navigate(`/items/${item.id}`)} className='item'>
        <img src={`http://127.0.0.1:8000${displayImages.length && displayImages.filter(image => image.item === item.id)[0].image}`}/>
        <div className='text-wrapper'>
          <div className='text'>
            <h2 className='col'>{item.collection}</h2>
            <h2 className='name'>{item.name}</h2>
          </div>
          <button onClick={(e) => {e.stopPropagation();removeItem(item.id)}} className='quick-btn1 quick-btn'>REMOVE {item.id}</button>
        </div>
      </motion.div>
      <div className='removed'>
        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill-rule="nonzero"/></svg>
        <p>Removed</p>
      </div>
    </div>
  )
}

export default DeleteStore