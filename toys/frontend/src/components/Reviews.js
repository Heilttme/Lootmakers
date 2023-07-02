import React, { useEffect, useState } from 'react'
import tg from "../assets/b-tg.png"

const Reviews = ({ reviews }) => {
  const [fr1, setFr1] = useState([])
  const [fr2, setFr2] = useState([])

  useEffect(() => {
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
    
    let o = true
    for (let i = 0; i < reviews.length; i++){
      if (o){
        setFr1(prev => [...prev, reviewsDisplay[i]])
        o = false
      } else {
        setFr2(prev => [...prev, reviewsDisplay[i]])
        o = true
      }
    }
  }, [reviews])

  return (
    <>
      <div className='review-head'>
        <h2>OUR REVIEWS</h2>
      </div>
      <div className='reviews-wrapper'>
        <div className='reviews'>
          <div className='l1'>{fr1}</div>
          <div className='l2'>{fr2}</div>
        </div>
      </div>
    </>
  )
}

export default Reviews