import React, { useEffect, useRef, useState } from 'react'
import Input from './Input';
import axios from "axios"
import { motion } from "framer-motion"
import { t } from "i18next"
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const AddItem = () => {
  // ITEMFORMDATA ACTIONS //
  const [itemFormData, setItemFormData] = useState({
    name: "",
    collection: "",
    type: "",
    madeBy: "",
    year: "",
    month: "",
    day: "",
    hour: "",
    price: "",
    quantityAvailable: "",
    quote: "",
    author: "",
    orderType: "",
    "text-0": "",
    "text-1": "",
    "text-2": "",
    "text-3": "",
    "text-4": "",
    "text-5": "",
    censor: ""
  })

  const changeItemFormData = (e) => {
    const {name, value} = e.target
    setItemFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [formSubmitted, setFormSubmitted] = useState(0)

  const [blockQuantity, setBlockQuantity] = useState(1)
  const [textQuantity, setTextQuantity] = useState(1)

  const [nameError, setNameError] = useState(false)
  const [collectionError, setCollectionError] = useState(false)
  const [typeError, setTypeError] = useState(false)
  const [madeByError, setMadeByError] = useState(false)
  const [mainTextError, setMainTextError] = useState(false)
  const [quoteError, setQuoteError] = useState(false)
  const [authorError, setAuthorError] = useState(false)
  const [blockInfoError, setBlockInfoError] = useState(false)
  const [priceError, setPriceError] = useState(false)
  const [dateError, setDateError] = useState(false)
  const [quantityError, setQuantityError] = useState(false)
  const [orderTypeError, setOrderTypeError] = useState(false)
  const [censorError, setCensorError] = useState(false)
  
  const [item3dFiles, setItem3dFiles] = useState({})
  const [itemFiles, setItemFiles] = useState({})
  const [displayFile, setDisplayFile] = useState({})

  const [d3Error, set3dError] = useState(false)
  const [displayError, setDisplayError] = useState(false)
  const [itemFilesError, setItemFilesError] = useState(false)

  const d3InputRef = useRef(null)
  const itemFilesRef = useRef(null)
  const displayFilesRef = useRef(null)

  useEffect(() => {
    !item3dFiles.length && d3InputRef.current && (() => d3InputRef.current.value = "")()
  }, [item3dFiles])

  useEffect(() => {
    !itemFiles.length && itemFilesRef.current && (() => itemFilesRef.current.value = "")()
  }, [itemFiles])

  useEffect(() => {
    !displayFile.length && displayFilesRef.current && (() => displayFilesRef.current.value = "")()
  }, [displayFile])

  
  const onItemSubmit = () => {
    if (
      itemFormData.name && 
      itemFormData.collection && 
      itemFormData.type && 
      itemFormData.madeBy && 
      Object.keys(itemFormData).filter(it => it.startsWith("text")).length && 
      itemFormData.quote && 
      itemFormData.author && 
      itemFormData.price && 
      itemFormData.quantityAvailable && 
      itemFormData.censor && 
      (itemFormData.orderType === "preorder" && itemFormData.year && itemFormData.month && itemFormData.day && itemFormData.hour) ||
       (itemFormData.orderType === "order" && (!(itemFormData.year || itemFormData.month || itemFormData.day || itemFormData.hour) || (itemFormData.year && itemFormData.month && itemFormData.day && itemFormData.hour))) &&
      item3dFiles.length && 
      displayFile.length && 
      itemFiles.length
    ) {
      const data = Object.fromEntries(Object.entries(itemFormData).filter(([_, v]) => (v != "" && !v.startsWith("text"))))
      if (Object.keys(data).length >= 11) {
        const uploadData = new FormData()
        const item3dFilesArray = Array.from(item3dFiles)

        item3dFilesArray.forEach((file, index) => {
          uploadData.append(`images3D_${index}`, file)
        })
        uploadData.append("displayImage", displayFile[0])
        
        const itemFilesArray = Array.from(itemFiles)
        itemFilesArray.forEach((file, index) => {
          uploadData.append(`images_${index}`, file)
        })

        let blockInfoData = {}
        let mainText = []
        
        for (let i = 0; i < Object.keys(data).length; i++){
          let it = Object.keys(data)[i]
          if (
              it !== "name" &&
              it !== "collection" &&
              it !== "price" && 
              it !== "quantityAvailable" && 
              it !== "releaseDate" && 
              it !== "quote" && 
              it !== "author" && 
              it !== "type" && 
              it !== "orderType" && 
              it !== "madeBy" &&
              it !== "year" &&
              it !== "month" &&
              it !== "day" &&
              it !== "hour" &&
              it !== "censor" &&
              !it.startsWith("text")
          ) {
            blockInfoData = {...blockInfoData, [it]: data[it]}
          }

          if (it.startsWith("text")) {
            mainText.push(data[it])
          }
        }
        
        blockInfoData = Object.keys(blockInfoData).map(item => `${item}:${blockInfoData[item]}`).join(";")
        mainText = mainText.join(";")
        
        uploadData.append("name", data.name)
        uploadData.append("collection", data.collection)
        uploadData.append("type", data.type)
        uploadData.append("madeBy", data.madeBy)
        uploadData.append("mainText", mainText)
        uploadData.append("quote", data.quote)
        uploadData.append("author", data.author)
        uploadData.append("blockInfo", blockInfoData)
        uploadData.append("orderType", data.orderType)
        uploadData.append("censor", data.censor)
        uploadData.append("year", data.year)
        uploadData.append("month", data.month)
        uploadData.append("day", data.day)
        uploadData.append("hour", data.hour)
        uploadData.append("price", data.price)
        uploadData.append("quantityAvailable", data.quantityAvailable)
    
        const res = axios.post("http://127.0.0.1:8000/api/toy_admin_add_item/", uploadData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(() => {
          toast.success('Successfully added', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
          const newData = {}
          for (let i = 0; i < Object.keys(itemFormData).length; i++) {
            newData[Object.keys(itemFormData)[i]] = ""
          }
          setItemFormData(newData)
          setItem3dFiles({})
          setItemFiles({})
          setDisplayFile({})
          setBlockQuantity(1)
          setTextQuantity(1)
          setFormSubmitted(prev => prev + 1)
        }).catch(() => 
          toast.error('An error occured', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
        )
      }
    } else {
      !itemFormData.name && setNameError(true)
      !itemFormData.collection && setCollectionError(true)
      !itemFormData.type && setTypeError(true)
      !itemFormData.madeBy && setMadeByError(true)
      !Object.keys(itemFormData).filter(it => it.startsWith("text")).length && setMainTextError(true)
      !itemFormData.quote && setQuoteError(true)
      !itemFormData.author && setAuthorError(true)
      !itemFormData.price && setPriceError(true)
      !itemFormData.orderType && setOrderTypeError(true)
      !itemFormData.quantityAvailable && setQuantityError(true)
      !(Object.keys(itemFormData).length >= 11) && setBlockInfoError(true)
      !item3dFiles.length && set3dError(true)
      !displayFile.length && setDisplayError(true)
      !itemFiles.length && setItemFilesError(true)
      !itemFiles.censor && setCensorError(true)
      !((itemFormData.orderType === "preorder" && itemFormData.year && itemFormData.month && itemFormData.day && itemFormData.hour) ||
       (itemFormData.orderType === "order" && (!(itemFormData.year || itemFormData.month || itemFormData.day || itemFormData.hour) || (itemFormData.year && itemFormData.month && itemFormData.day && itemFormData.hour)))) && setDateError(true)
    }
  }
  
  // ITEMFORMDATA ACTIONS //
  
  // REVIEW FORMDATA ACTIONS //
  const [reviewFormData, setReviewFormData] = useState({
    nickname: "",
    username: "",
    content: "",
  })
  
  const changeReviewFormData = (e) => {
    const {name, value} = e.target
    setReviewFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [nicknameError, setNicknameError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [contentError, setContentError] = useState(false)
  const [pfpError, setPfpError] = useState(false)
  const [reviewImageError, setReviewImageError] = useState(false)

  const [pfp, setPfp] = useState({})
  const [reviewImage, setReviewImage] = useState({})

  const pfpRef = useRef(null)
  const reviewImageRef = useRef(null)

  useEffect(() => {
    !pfp.length && pfpRef.current && (() => pfpRef.current.value = "")()
  }, [pfp])

  useEffect(() => {
    !reviewImage.length && reviewImageRef.current && (() => reviewImageRef.current.value = "")()
  }, [reviewImage])

  const onReviewSubmit = () => {
    if (reviewFormData.nickname && reviewFormData.username && reviewFormData.content && pfp.length && reviewImage.length) {
      const uploadData = new FormData()
      uploadData.append("nickname", reviewFormData.nickname)
      uploadData.append("username", reviewFormData.username)
      uploadData.append("content", reviewFormData.content)
      uploadData.append("pfp", pfp[0])
      uploadData.append("reviewImage", reviewImage[0])

      const res = axios.post("http://127.0.0.1:8000/api/toy_admin_add_review/", uploadData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(() => {
          toast.success('Successfully added', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
          setReviewFormData({
            nickname: "",
            username: "",
            content: "",
          })
          setPfp({})
          setReviewImage({})
        }
      ).catch(() => 
        toast.error('An error occured', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
      )
    } else {
      !reviewFormData.nickname && setNicknameError(true)
      !reviewFormData.username && setUsernameError(true)
      !reviewFormData.content && setContentError(true)
      !pfp.length && setPfpError(true)
      !reviewImage.length && setReviewImageError(true)
    }
  }
  // REVIEW FORMDATA ACTIONS //

  return (
    <div className='add'>
      <div className='form-item'>
        <h2>Add item</h2>
        <div className='form'>
          <Input question="" label={"name"} onChange={(e) => changeItemFormData(e)} value={itemFormData.name} error={nameError} setError={setNameError} />
          <Input question="" label={"collection"} onChange={(e) => changeItemFormData(e)} value={itemFormData.collection} error={collectionError} setError={setCollectionError} />
          <div className='field'>
            <select
              style={{color: typeError ? "rgb(247, 61, 61)" : "white"}}
              value={itemFormData.type}
              onChange={(e) => {setItemFormData(prev => ({...prev, type: e.target.value})); setTypeError(false)}}
            >
              {itemFormData.type === "" && <option>Type</option>}
              <option>Plush</option>
              <option>Vinyl</option>
            </select>
          </div>
          <div className='field'>
            <select
              style={{color: madeByError ? "rgb(247, 61, 61)" : "white"}}
              value={itemFormData.type}
              onChange={(e) => {setItemFormData(prev => ({...prev, madeBy: e.target.value})); setMadeByError(false)}}
            >
              {itemFormData.madeBy === "" && <option>Made by</option>}
              <option>Loot Makers</option>
            </select>
          </div>
          <div className='field'>
            <div className='block-info-block'>
            {[...Array(textQuantity)].map((_, i) => 
              <div className='field' id={uuidv4()}>
                <NewTextBlock formSubmitted={formSubmitted} setError={setMainTextError} error={mainTextError} q={i} formData={itemFormData} setFormData={setItemFormData} textQuantity={textQuantity} setTextQuantity={setTextQuantity} changeFormData={changeItemFormData}/>
              </div>
            )}
            </div>
          </div>
          <Input question="" label={"quote"} onChange={(e) => changeItemFormData(e)} value={itemFormData.quote} error={quoteError} setError={setQuoteError} />
          <Input question="" label={"author"} onChange={(e) => changeItemFormData(e)} value={itemFormData.author} error={authorError} setError={setAuthorError} />
          <input ref={d3InputRef} type="file" onChange={(e) => {setItem3dFiles(e.target.files)}} multiple accept='image/*' id="file1"/>
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

          <input ref={itemFilesRef} type="file" onChange={(e) => setItemFiles(e.target.files)} multiple accept='image/*' id="file2"/>
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
          <input ref={displayFilesRef} type="file" onChange={(e) => setDisplayFile(e.target.files)} accept='image/*' id="file3"/>
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
                <BlockInfoDoubleInput formSubmitted={formSubmitted} setError={setBlockInfoError} error={blockInfoError} q={i} formData={itemFormData} setFormData={setItemFormData} blockQuantity={blockQuantity} setBlockQuantity={setBlockQuantity}/>
              </div>
            )}
            </div>
          </div>
          <div className='field type'>
            <ul className='types'>
              <h2>{t("Type")}</h2>
              <li className='type-b'>
                <input 
                  name='input'
                  id='inp1'
                  type="radio"
                  checked={itemFormData.orderType === "preorder" && true}
                  onClick={(e) => {
                    if (e.target.checked) {
                      setItemFormData(prev => ({...prev, orderType: "preorder"}))
                      setOrderTypeError(false)
                      setDateError(false)
                    }
                  }}
                />
                <motion.label animate={{color: orderTypeError ? "rgb(247, 61, 61)" : "rgb(0, 0, 0)"}} for='inp1'>{t("Preorder")}</motion.label>
              </li>
              <li className='type-b'>
                <input 
                  name='input'
                  id='inp2'
                  type="radio"
                  checked={itemFormData.orderType === "order" && true}
                  onClick={(e) => {
                    if (e.target.checked) {
                      setItemFormData(prev => ({...prev, orderType: "order"}))
                      setOrderTypeError(false)
                      setDateError(false)
                    }
                  }}
                />
                <motion.label animate={{color: orderTypeError ? "rgb(247, 61, 61)" : "rgb(0, 0, 0)"}} for='inp2'>{t("Order")}</motion.label>
              </li>
            </ul>
          </div>
          
          <div className='date-input'>
            <Input question="" label={"year"} onChange={(e) => changeItemFormData(e)} value={itemFormData.year} error={dateError} setError={setDateError} />
            <Input question="" label={"month"} onChange={(e) => changeItemFormData(e)} value={itemFormData.month} error={dateError} setError={setDateError} />
            <Input question="" label={"day"} onChange={(e) => changeItemFormData(e)} value={itemFormData.day} error={dateError} setError={setDateError} />
            <Input question="" label={"hour"} onChange={(e) => changeItemFormData(e)} value={itemFormData.hour} error={dateError} setError={setDateError} />
          </div>

          <div className='field type'>
            <ul className='types'>
              <h2>{t("Censor")}</h2>
              <li className='type-b'>
                <input 
                  name='inputc'
                  id='inputcensor1'
                  type="radio"
                  checked={itemFormData.censor === "applied" && true}
                  onClick={(e) => {
                    if (e.target.checked) {
                      setItemFormData(prev => ({...prev, censor: "applied"}))
                      setCensorError(false)
                    }
                  }}
                />
                <motion.label animate={{color: censorError ? "rgb(247, 61, 61)" : "rgb(0, 0, 0)"}} htmlFor="inputcensor1">{t("Applied")}</motion.label>
              </li>
              <li className='type-b'>
                <input 
                  name='inputc'
                  id='inputcensor2'
                  type="radio"
                  checked={itemFormData.censor === "disabled" && true}
                  onClick={(e) => {
                    console.log(123123);
                    if (e.target.checked) {
                      setItemFormData(prev => ({...prev, censor: "disabled"}))
                      setCensorError(false)
                    }
                  }}
                />
                <motion.label animate={{color: censorError ? "rgb(247, 61, 61)" : "rgb(0, 0, 0)"}} htmlFor="inputcensor2">{t("Disabled")}</motion.label>
              </li>
            </ul>
          </div>

          <Input question="" label={"price"} onChange={(e) => changeItemFormData(e)} value={itemFormData.price} error={priceError} setError={setPriceError} />
          <Input question="" label={"quantityAvailable"} onChange={(e) => changeItemFormData(e)} value={itemFormData.quantityAvailable} error={quantityError} setError={setQuantityError} />
          <button onClick={onItemSubmit}>Submit</button>
        </div>
      </div>

      <div className='form-review'>
        <h2>Add review</h2>
        <div className='form'>
          <Input question="" label={"nickname"} onChange={(e) => changeReviewFormData(e)} value={reviewFormData.nickname} error={nicknameError} setError={setNicknameError} />
          <Input question="" label={"username"} onChange={(e) => changeReviewFormData(e)} value={reviewFormData.username} error={usernameError} setError={setUsernameError} />
          <Input question="" label={"content"} onChange={(e) => changeReviewFormData(e)} value={reviewFormData.content} error={contentError} setError={setContentError} />
          <input ref={pfpRef} type="file" onChange={(e) => setPfp(e.target.files)} accept='image/*' id="file4"/>
          <label onClick={() => setPfpError(false)} style={{color: pfpError ? "rgb(247, 61, 61)" : "white"}} className='file_label' for="file4">
            {
              pfp.length ? 
                `${pfp.length} file selected`
              :
                <>
                  <p>Choose profile picture</p><p>+</p>
                </>
            }
          </label>
          <input ref={reviewImageRef} type="file" onChange={(e) => setReviewImage(e.target.files)} accept='image/*' id="file5"/>
          <label onClick={() => setReviewImageError(false)} style={{color: reviewImageError ? "rgb(247, 61, 61)" : "white"}} className='file_label' for="file5">
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
  )
}

const BlockInfoDoubleInput = ({ formSubmitted, error, setError, q, setFormData, formData, blockQuantity, setBlockQuantity }) => {
  const [input1Focus, setInput1Focus] = useState(false)
  const [input2Focus, setInput2Focus] = useState(false)

  const [fieldName, setFieldName] = useState("")

  const changeFormData1 = (e) => {
    setFormData(prev => ({...prev, [e.target.value]: ""}))
    setFieldName(e.target.value)
  }

  const changeFormData2 = (e) => {
    setFormData(prev => ({...prev, [fieldName]: e.target.value}))
  }

  useEffect(() => {
    if (formSubmitted !== 0) {
      setFormData(prev => ({...prev, [fieldName]: ""}))
      setTimeout(() => setFieldName(""), 100)
    }
  }, [formSubmitted])

  // useEffect(() => { 

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

const NewTextBlock = ({ q, formData, changeFormData, setTextQuantity, textQuantity, error, setError }) => {
  const [focus, setFocus] = useState(false)
  const [changed, setChanged] = useState(false)

  const value = formData[`text-${q}`]

  useEffect(() => {
    textQuantity === (q + 1) && changed && setTextQuantity(prev => prev + 1)
  }, [changed])

  return ( 
    <motion.div 
      initial={{height: 0}}
      animate={{height: "100%"}}
      transition={{type: "keyframes", stiffness: 100}}
      className='additional-text'
    >
      <textarea 
        name={`text-${q}`}
        onChange={e => {changeFormData(e);setChanged(true)}}
        // onChange={e => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))}
        // onChange={e => setFormData(prev => ({...prev, links: {...prev.links, [e.target.name]: e.target.value}}))}
        id={`text-${q}`}
        value={value}
        onFocus={() => {setFocus(true);setError(false)}}
        onBlur={() => setFocus(false)}
      />
      <motion.label animate={(formData[`text-${q}`] || focus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {color: error ? "rgb(247, 61, 61)" : "rgb(255, 255, 255)"}} transition={{color: {stiffness: 100}}} className={`text-label${ error ? " error" : ""}`} htmlFor={`text-${q}`}>{t("Text")}</motion.label>
    </motion.div>
  )
}


export default AddItem