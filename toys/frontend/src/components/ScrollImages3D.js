import React, { useState } from 'react'

const ScrollImages3D = ({ mapped3DImages, item }) => {
  const [curIndex, setCurIndex] = useState(0)

  return (
    <div>
      <img src={`localhost:3000/media/item_content/item_${item.id}/3d/${item.name}_${curIndex}`}></img>
      <input type="range" min="0" max={mapped3DImages.length - 1} value={curIndex} onChange={(e) => setCurIndex(e.target.value)}/>
    </div>
  )
}

export default ScrollImages3D