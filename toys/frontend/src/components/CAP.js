import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import Input from './Input'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"

const CAP = ({  }) => {
  const [block, setBlock] = useState("Add")
  const [formData, setFormData] = useState({
    name: "",
    collection: "",
    releaseDate: "",
    price: "",
    quantityAvailable: "",
  })
  const [item3dFiles, setItem3dFiles] = useState({})
  const [itemFiles, setItemFiles] = useState({})
  const [displayFile, setDisplayFile] = useState({})
  
  const [pfp, setPfp] = useState({})
  const [reviewImage, setReviewImage] = useState({})

  const [blockQuantity, setBlockQuantity] = useState(1)

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
  const [nicknameError, setNicknameError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [contentError, setContentError] = useState(false)
  const [d3Error, set3dError] = useState(false)
  const [displayError, setDisplayError] = useState(false)
  const [itemFilesError, setItemFilesError] = useState(false)

  const onItemSubmit = () => {
    if (formData.name && formData.collection && formData.price && formData.releaseDate && formData.quantityAvailable && item3dFiles.length && displayFile.length && itemFiles.length) {
      if (Object.keys(formData).length >= 6) {
        const data = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v != ""))
        const uploadData = new FormData()
        uploadData.append("name", data.name)
        uploadData.append("collection", data.collection)
        const item3dFilesArray = Array.from(item3dFiles);
        item3dFilesArray.forEach((file, index) => {
          uploadData.append(`images3D_${index}`, file);
        });
        uploadData.append("displayImage", displayFile[0])
        
        const itemFilesArray = Array.from(itemFiles);
        itemFilesArray.forEach((file, index) => {
          uploadData.append(`images_${index}`, file);
        });

        let blockInfoData = {}
        for (let i = 0; i < Object.keys(data).length; i++ ){
          console.log(Object.keys(data)[i]);
          if (Object.keys(data)[i] !== "name" && Object.keys(data)[i] !== "collection" && Object.keys(data)[i] !== "price" && Object.keys(data)[i] !== "quantityAvailable" && Object.keys(data)[i] !== "releaseDate") {
            blockInfoData = {...blockInfoData, [Object.keys(data)[i]]: data[Object.keys(data)[i]]}
          }
        }
        
        blockInfoData = Object.keys(blockInfoData).map(item => `${item}:${blockInfoData[item]}`).join(";")
        
        uploadData.append("blockInfo", blockInfoData)
        uploadData.append("releaseDate", data.releaseDate)
        uploadData.append("price", data.price)
        uploadData.append("quantityAvailable", data.quantityAvailable)
    
        const res = axios.post("http://127.0.0.1:8000/api/toy_admin_add_item/", uploadData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      }
    } else {
      !formData.name.length && setNameError(true)
      !formData.collection && setCollectionError(true)
      !formData.price && setPriceError(true)
      !formData.releaseDate && setReleaseDateError(true)
      !formData.quantityAvailable && setQuantityError(true)
      !(Object.keys(formData).length >= 6) && setBlockInfoError(true)
      !item3dFiles.length && set3dError(true)
      !displayFile.length && setDisplayError(true)
      !itemFiles.length && setItemFilesError(true)
    }
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
                  <Input question="" label={"name"} onChange={(e) => changeFormData(e)} value={formData.name} error={nameError} setError={setNameError} />
                  <Input question="" label={"collection"} onChange={(e) => changeFormData(e)} value={formData.collection} error={collectionError} setError={setCollectionError} />
                  <input type="file" onChange={(e) => setItem3dFiles(e.target.files)} multiple accept='image/*' id="file1"/>
                  <label onClick={() => set3dError(false)} style={{color: d3Error ? "rgb(247, 61, 61)" : "white"}} className='file_label' for="file1">
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
                  <label onClick={() => setItemFilesError(false)} style={{color: itemFilesError ? "rgb(247, 61, 61)" : "white"}} className='file_label' for="file2">
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
                  <label onClick={() => setDisplayError(false)} style={{color: displayError ? "rgb(247, 61, 61)" : "white"}} className='file_label' for="file3">
                    {
                      displayFile.length ? 
                        `${displayFile.length} file selected`
                      :
                        <>
                          <p>Choose face image</p><p>+</p>
                        </>
                    }
                  </label>
                  {/* <Input question={""} label={"blockInfo"} onChange={(e) => changeFormData(e)} value={formData.blockInfo} error={blockInfoError} setError={setBlockInfoError} /> */}
                  <div className='field'>
                    <div className='block-info-block'>
                    {[...Array(blockQuantity)].map((_, i) => 
                      <div className='field' id={uuidv4()}>
                        <BlockInfoDoubleInput setError={setBlockInfoError} error={blockInfoError} q={i} formData={formData} setFormData={setFormData} blockQuantity={blockQuantity} setBlockQuantity={setBlockQuantity}/>
                      </div>
                    )}
                    </div>
                  </div>

                  <Input question="" label={"releaseDate"} onChange={(e) => changeFormData(e)} value={formData.releaseDate} error={releaseDateError} setError={setReleaseDateError} />
                  <Input question="" label={"price"} onChange={(e) => changeFormData(e)} value={formData.price} error={priceError} setError={setPriceError} />
                  <Input question="" label={"quantityAvailable"} onChange={(e) => changeFormData(e)} value={formData.quantityAvailable} error={quantityError} setError={setQuantityError} />
                  <button onClick={onItemSubmit}>Submit</button>
                </div>
              </div>

              <div className='form-review'>
                <h2>Add review</h2>
                <div className='form'>
                  <Input question={""} label={"nickname"} onChange={(e) => changeFormData(e)} value={formData.nickname} error={nicknameError} setError={setNicknameError} />
                  <Input question={""} label={"username"} onChange={(e) => changeFormData(e)} value={formData.username} error={usernameError} setError={setUsernameError} />
                  <Input question={""} label={"content"} onChange={(e) => changeFormData(e)} value={formData.content} error={contentError} setError={setContentError} />
                  <input type="file" onChange={(e) => setPfp(e.target.files)} accept='image/*' id="file4"/>
                  <label className='file_label' for="file4">
                    {
                      pfp.length ? 
                        `${pfp.length} file selected`
                      :
                        <>
                          <p>Choose profile picture</p><p>+</p>
                        </>
                    }
                  </label>
                  <input type="file" onChange={(e) => setReviewImage(e.target.files)} accept='image/*' id="file5"/>
                  <label className='file_label' for="file5">
                    {
                      reviewImage.length ? 
                        `${reviewImage.length} file selected`
                      :
                        <>
                          <p>Choose review picture</p><p>+</p>
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


export const BlockInfoDoubleInput = ({ error, setError, q, setFormData, formData, blockQuantity, setBlockQuantity }) => {
  const [input1Focus, setInput1Focus] = useState(false)
  const [input2Focus, setInput2Focus] = useState(false)

  const [fieldName, setFieldName] = useState("")

  const changeFormData1 = (e) => {
    // setFormData(prev => {
    //   let newDict = ({...prev})
    //   // delete newDict[e.target.value.split(0, e.target.value.length - 1)[0]]
    //   // console.log(e.target.value.split(0, e.target.value.length - 1)[0])
    //   return newDict
    // })
    setFormData(prev => ({...prev, [e.target.value]: ""}))
    setFieldName(e.target.value)
  }

  const changeFormData2 = (e) => {
    setFormData(prev => ({...prev, [fieldName]: e.target.value}))
  }

  const [changed1, setChanged1] = useState(false)
  const [changed2, setChanged2] = useState(false)

  useEffect(() => {
    if ((changed1 + changed2) === 2) {
      blockQuantity === (q + 1) && setBlockQuantity(prev => prev + 1)
    }
  }, [changed1, changed2])

  return (
    <div className='block-info'>
      <div className='block-1'>
        <input 
          name={`block-${q}-1`}
          onChange={(e) => {changeFormData1(e);setChanged1(true)}}
          id={`block-${q}-1`}
          value={fieldName}
          onFocus={() => {setInput1Focus(true);setError(false)}}
          onBlur={() => setInput1Focus(false)}
        />
        <label className={`text-label${ error ? " error" : ""}`} htmlFor={`block-${q}-1`}>Column 1</label>
      </div>
      <div className='block-2'>
        <input 
          disabled={fieldName.length ? false : true}
          name={`block-${q}-2`}
          onChange={(e) => {changeFormData2(e);setChanged2(true)}}
          id={`block-${q}-2`}
          value={formData[fieldName]}
          onFocus={() => {setInput2Focus(true);setError(false)}}
          onBlur={() => setInput2Focus(false)}
        />
        <label className={`text-label${ error ? " error" : ""}`} htmlFor={`block-${q}-2`}>Column 2</label>
      </div>
    </div>
  )
}


export default CAP