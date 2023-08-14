import React, { useEffect, useRef, useState } from 'react'
import Input from '../Input';
import axios from "axios"
import { motion } from "framer-motion"
import { t } from "i18next"
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const AddReview = () => {
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
  
  return (
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
  )
}

export default AddReview