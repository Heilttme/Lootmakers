import React, { useState } from 'react'
// import tren from 

const ScrollImages3D = ({ images }) => {
  const [curIndex, setCurIndex] = useState(0)

  return (
    <div>
      <img src={require(`../assets/craig/${images[curIndex]}`)}></img>
      <input type="range" min="0" max={images.length - 1} value={curIndex} onChange={(e) => setCurIndex(e.target.value)}/>
    </div>
  )
}

export default ScrollImages3D