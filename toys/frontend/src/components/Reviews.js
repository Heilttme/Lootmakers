import React, { useEffect, useState } from 'react'
import tg from "../assets/tg.png"

const Reviews = ({ reviews }) => {
  const [frs, setFrs] = useState([])

  useEffect(() => {
    for (let i = 0; i < (reviews.length / 2); i++){
      setFrs(prev => [...prev, "1fr"])
    }
  }, [reviews])

  const reviewsDisplay = reviews.map(item => (
    <div className='review'>
      <div className='top'>
        <div className='name'>
          <div className='f-col'>
            <img className='pfp' src={`http://127.0.0.1:8000${item.pfp}`}></img>
            <div className='text'>
              <h3>{item.nickname.length > 12 ? `${item.nickname.slice(0, 12)}...` : item.nickname}</h3>
              <p>{item.username.length > 12 ? `${item.username.slice(0, 12)}...` : item.username}</p>
            </div>
          </div>
          <img className='tg' src={tg} />
        </div>
        <div className='content'>{item.content}</div>
      </div>
      <div className='bot'>
        <img className='review-pic' src={`http://127.0.0.1:8000${item.reviewImage}`}/>
      </div>
    </div>
  ))
  return (
    <>
      <div className='review-head'>
        <h2>OUR REVIEWS</h2>
      </div>
      <div className='reviews-wrapper'>
        <div style={{gridTemplateColumns: `${frs.join(" ")}`}} className='reviews'>
          {reviewsDisplay}
        </div>
      </div>
    </>
  )
}

export default Reviews