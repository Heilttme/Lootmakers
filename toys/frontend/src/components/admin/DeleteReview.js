import React, { useEffect, useState } from 'react'
import { t } from 'i18next'
import tg from "../../../src/assets/b-tg.png"
import axios from "axios"
import { motion } from 'framer-motion'

const DeleteReview = ({ reviews }) => {

  let reviewsDisplay = reviews.map(item => <ReviewDeleteItem item={item}/>)

  const [filter, setFilter] = useState(-1)
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
    if (filter !== -1) {
      reviewsDisplay = reviews.filter(it => (it.id === parseInt(filter) || it.username.toLowerCase().includes(filter.toLowerCase())) || it.nickname.toLowerCase().includes(filter.toLowerCase()) || it.content.toLowerCase().includes(filter.toLowerCase())).map(item => <ReviewDeleteItem item={item}/>)
    }
    setFilteredItems(reviewsDisplay)
  }, [filter])

  const [filterFocus, setFilterFocus] = useState(false)
  
  return (
    <div className='delete-review'>
      <div className='filter'>
        <input 
          name='filter'
          value={filter === -1 ? "" : filter}
          onChange={(e) => setFilter(e.target.value)}
          id="filter"
          onFocus={() => setFilterFocus(true)}
          onBlur={() => setFilterFocus(false)}
        />
        <motion.label animate={((filter && filter !== -1) || filterFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {color: "rgb(255, 255, 255)"}} transition={{color: {stiffness: 100}}} className={`text-label`} htmlFor={`filter`}>{t("Filter")}</motion.label>
      </div>
      <div className='items'>
        {filteredItems}
      </div>
    </div>
  )
}

const ReviewDeleteItem = ({ item }) => {
    const [collapse, setCollapse] = useState()
  
    const removeItem = (id) => {
      const res = axios.post("http://127.0.0.1:8000/api/remove_review/", {id})
  
      setTimeout(() => {
        setCollapse(true)
      }, 300)
    }
  
  return (
    <div className='wrapper-review'>
      <motion.div initial={{height: "auto"}} animate={{height: collapse ? 0 : "auto"}} transition={{duration: '.5'}} className='review'>
        <div className='top'>
          <div className='name'>
            <div className='f-col'>
              <img className='pfp' src={`http://127.0.0.1:8000${item.pfp}`}></img>
              <div className='text'>
                <h3>{item.nickname}</h3>
                <p><span>@</span>{item.username}</p>
              </div>
            </div>
            <img className='tg' src={tg} />
          </div>
          <div className='content'>{item.content}</div>
        </div>
        <div className='bot'>
          <img className='review-pic' src={`http://127.0.0.1:8000${item.reviewImage}`}/>
        </div>
        <button onClick={(e) => {e.stopPropagation();removeItem(item.id)}} className='quick-btn1 quick-btn'>Delete {item.id}</button>
      </motion.div>
      <div className='removed'>
        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill-rule="nonzero"/></svg>
        <p>Removed</p>
      </div>
    </div>
  )
}

export default DeleteReview