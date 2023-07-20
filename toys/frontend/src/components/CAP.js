import React, { useState } from 'react'
import { motion } from "framer-motion"
import Input from './Input'

const CAP = ({  }) => {
  const [block, setBlock] = useState("Add")
  const [formData, setFormData] = useState({
    login: "",
    password: ""
  })
  const [item3dFiles, setItem3dFiles] = useState({})
  const [itemFiles, setItemFiles] = useState({})
  const [displayFile, setDisplayFile] = useState({})
  
  const [pfp, setPfp] = useState({})
  const [reviewImage, setReviewImage] = useState({})

  const changeFormData = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [nameError, setNameError] = useState(false)
  const [collectionError, setCollectionError] = useState(false)
  const [blockInfoError, setBlockInfoError] = useState(false)
  const [priceError, setPriceError] = useState(false)
  const [releaseDateError, setReleaseDateError] = useState(false)
  const [quantityError, setQuantityError] = useState(false)

  const onItemSubmit = () => {
  }

  const onReviewSubmit = () => {

  }
  
  return (
    <div className='CAP'>
      <div className='navigation'>
        <div className='block'>
          <a onClick={() => setBlock("Add")} className={`${block === "Add" ? "current" : ""}`}>Add instance</a>
        </div>
        <div className='block'>
          <a onClick={() => setBlock("S1")} className={`${block === "S1" ? "current" : ""}`}>SAMPLE 1</a>
        </div>
        <div className='block'>
          <a onClick={() => setBlock("S2")} className={`${block === "S2" ? "current" : ""}`}>SAMPLE 2</a>
        </div>
        <div className='block'>
          <a onClick={() => setBlock("S3")} className={`${block === "S3" ? "current" : ""}`}>SAMPLE 3</a>
        </div>
      </div>

      <div className='panel'>
        
        {
          block ===  "Add" ?
            <div className='add'>
              <div className='form-item'>
                <h2>Add item</h2>
                <div className='form'>
                  <Input question={""} label={"name"} onChange={(e) => changeFormData(e)} value={formData.name} error={nameError} setError={setNameError} />
                  <Input question={""} label={"collection"} onChange={(e) => changeFormData(e)} value={formData.collection} error={collectionError} setError={setCollectionError} />
                  <input type="file" onChange={(e) => setItem3dFiles(e.target.files)} multiple accept='image/*' id="file1"/>
                  <label className='file_label' for="file1">
                    {
                      item3dFiles.length ? 
                        `${item3dFiles.length} files selected`
                      :
                        <>
                          <p>Choose images for 3d display</p><p>+</p>
                        </>
                    }
                  </label>

                  <input type="file" onChange={(e) => setItemFiles(e.target.files)} multiple accept='image/*' id="file2"/>
                  <label className='file_label' for="file2">
                    {
                      itemFiles.length ? 
                        `${itemFiles.length} files selected`
                      :
                        <>
                          <p>Choose images for display</p><p>+</p>
                        </>
                    }
                  </label>
                  <input type="file" onChange={(e) => setDisplayFile(e.target.files)} accept='image/*' id="file3"/>
                  <label className='file_label' for="file3">
                    {
                      displayFile.length ? 
                        `${displayFile.length} file selected`
                      :
                        <>
                          <p>Choose face image</p><p>+</p>
                        </>
                    }
                  </label>
                  <Input question={""} label={"blockInfo"} onChange={(e) => changeFormData(e)} value={formData.blockInfo} error={blockInfoError} setError={setBlockInfoError} />

                  <Input question={""} label={"releaseDate"} onChange={(e) => changeFormData(e)} value={formData.releaseDate} error={releaseDateError} setError={setReleaseDateError} />
                  <Input question={""} label={"price"} onChange={(e) => changeFormData(e)} value={formData.price} error={priceError} setError={setPriceError} />
                  <Input question={""} label={"QuantityAvailable"} onChange={(e) => changeFormData(e)} value={formData.quantityAvailable} error={quantityError} setError={setQuantityError} />
                  <button onClick={onItemSubmit}>Submit</button>
                </div>
              </div>

              <div className='form-review'>
                <h2>Add review</h2>
                <div className='form'>
                  <Input question={""} label={"nickname"} onChange={(e) => changeFormData(e)} value={formData.nickname} error={nicknameError} setError={setNicknameError} />
                  <Input question={""} label={"username"} onChange={(e) => changeFormData(e)} value={formData.username} error={usernameError} setError={setUsernameError} />
                  <Input question={""} label={"content"} onChange={(e) => changeFormData(e)} value={formData.content} error={contentError} setError={setContentError} />
                  <input type="file" onChange={(e) => setDisplayFile(e.target.files)} accept='image/*' id="file4"/>
                  <label className='file_label' for="file4">
                    {
                      displayFile.length ? 
                        `${displayFile.length} file selected`
                      :
                        <>
                          <p>Choose profile picture</p><p>+</p>
                        </>
                    }
                  </label>
                  <button onClick={onReviewSubmit}>Submit</button>
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