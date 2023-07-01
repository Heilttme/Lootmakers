import React from 'react'

const Store = ({ items, storeRef }) => {

  const itemsDisplay = items.map(item => (
    <div className='item'>
      <img src={item.displayImg}/>
      <h2>{item.name}</h2>
    </div>
  ))
  return (
    <div ref={storeRef} className='store'>
        <div className='store-head'>
            <h2>OUR STORE</h2>
        </div>
        <div className='items'>
            {itemsDisplay}
        </div>
    </div>
  )
}

export default Store