import React, { useEffect, useState } from 'react'

const ScrollImages3D = ({ setStopped, mapped3DImages, item }) => {
  const [curIndex, setCurIndex] = useState(0)
  const [mouseXStart, setMouseXStart] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.preventDefault()
    setIsDragging(true)
    setMouseXStart(e.clientX)
  }

  const handleDragEnd = (e) => {
    e.stopPropagation();
    setIsDragging(false);
    setMouseXStart(0)
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setMouseX(e.clientX)
      let index = 0
      // console.log(`CLIENT: ${e.clientX}`)
      // console.log(`mouse: ${mouseXStart}`)

      // if (Math.floor((e.clientX - mouseXStart) / 10) < 0) {
      //   index = mapped3DImages.length - Math.abs(Math.floor((e.clientX - mouseXStart) / 10))
      // } else {
      //   if (Math.floor((e.clientX - mouseXStart) / 10) > mapped3DImages.length - 1) {
      //     index = Math.abs(Math.floor((e.clientX - mouseXStart) / 10)) - mapped3DImages.length
      //   } else {
      //     index = Math.abs(Math.floor((e.clientX - mouseXStart) / 10))
      //   }
      // }
      index = Math.floor(Math.abs(e.clientX - mouseXStart) / 10) % mapped3DImages.length

      // console.log(index);
      setCurIndex(index)
    }
  };

  useEffect(() => {
    curIndex !== 0 && setStopped(true)
  }, [curIndex])

  return (
    <div className='scroll3D'>
      {
         item && <>
          <img
            draggable="true"
            style={{cursor: isDragging ? "grabbing" : "grab"}}
            onDragStart={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseMove={handleMouseMove}
            src={`http://127.0.0.1:8000${mapped3DImages[curIndex]}`}
          />
          <input type="range" min="0" max={mapped3DImages.length - 1} value={curIndex} onChange={(e) => setCurIndex(e.target.value)}/>
        </>
      }
    </div>
  )
}

export default ScrollImages3D