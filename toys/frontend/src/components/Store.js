import React, { useEffect, useState } from 'react'

const Store = ({ items, storeRef, displayImages }) => {
  const [oneLineItems, setOneLineItems] = useState([])
  const [twoLineItems, setTwoLineItems] = useState([])
  const [threeLineItems, setThreeLineItems] = useState([])

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

  const threeItemsDisplay = threeLineItems.map(item => (
    <div className='block'>
      {item[0] && <div className='item'>
        <img src={`http://127.0.0.1:8000${displayImages.length && displayImages.filter(image => image.item === item[0].id)[0].image}`}/>
        <h2>{item[0].name}</h2>
      </div>}
      {item[1] && <div className='item'>
        <img src={`http://127.0.0.1:8000${displayImages.length && displayImages.filter(image => image.item === item[1].id)[0].image}`}/>
        <h2>{item[1].name}</h2>
      </div>}
      {item[2] && <div className='item'>
        <img src={`http://127.0.0.1:8000${displayImages.length && displayImages.filter(image => image.item === item[2].id)[0].image}`}/>
        <h2>{item[2].name}</h2>
      </div>}
    </div>
  ))

{/* <div className='item'>
      <img src={`http://127.0.0.1:8000${displayImages.length && displayImages.filter(image => image.item === item.id)[0].image}`}/>
      <h2>{item.name}</h2>
    </div> */}
  
  return (
    <div ref={storeRef} className='store'>
        <div className='store-head'>
            <h2>OUR STORE</h2>
        </div>
        <div className='items'>
            {threeItemsDisplay}
        </div>
    </div>
  )
}

export default Store