import React from 'react'

const Contact = ({ setContactOpened }) => {
  return (
    <div className='contact'>
      <div className='pre'>
        <h1>Let's get with each other</h1>
        <p>Complete this short form so we can get to know you better</p>
        <button onClick={() => setContactOpened(true)}>GET STARTED</button>
      </div>
      <div className='form-block'>

      </div>
    </div>
  )
}

export default Contact