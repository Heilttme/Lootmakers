import React, { useState } from 'react'

const CAP = ({  }) => {
  const [block, setBlock] = useState("Add")
  const [formData, setFormData] = useState({
    login: "",
    password: ""
  })

  const changeFormData = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [nameFocus, setNameFocus] = useState(false)
  const [collectionFocus, setCollectionFocus] = useState(false)
  const [blockInfoFocus, setBlockInfoFocus] = useState(false)
  const [releaseDateFocus, setReleaseDateFocus] = useState(false)
  const [priceFocus, setPriceFocus] = useState(false)
  const [quantityFocus, setQuantityFocus] = useState(false)

  const [nameError, setNameError] = useState(false)
  const [collectionError, setCollectionError] = useState(false)
  const [blockInfoError, setBlockInfoError] = useState(false)
  const [priceError, setPriceError] = useState(false)
  const [releaseDateError, setReleaseDateError] = useState(false)
  const [quantityError, setQuantityError] = useState(false)
  
  return (
    <div className='CAP'>
      <div className='navigation'>
        <div className='block'>
          <a>Add instance</a>
        </div>
      </div>

      <div className='panel'>
        
        {
          block ===  "Add" ?
            <div className='add'>
              <div className='form-item'>
                <h2>Add item</h2>
                <div className='form'>
                  <div className="field">
                    <input 
                      name='login'
                      onChange={e => changeFormData(e)}
                      id="login"
                      value={formData.login}
                      onFocus={() => {setLoginFocus(true);setLoginError(false)}}
                      onBlur={() => setLoginFocus(false)}
                    />
                    <motion.label animate={(formData.login || loginFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ loginError ? " error" : ""}`} htmlFor="login">Login</motion.label>
                  </div>
                </div>
              </div>

              <div className='form-review'>
                <h2>Add review</h2>
                <div className='form'>
                  
                </div>
              </div>
            </div>
          :
            <div>

            </div>
        }
        
      </div>
    </div>
  )
}

export default CAP