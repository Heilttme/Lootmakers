import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { t } from 'i18next'

const ContactForm = ({ contactOpened, allowScroll, setContactOpened }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    person: "",
    social: "",
    channel: "",
    links: {}
  })

  const [linkQuantity, setLinkQuantity] = useState(1)

  const [curStep, setCurStep] = useState(0)

  const changeFormData = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const [person, setPerson] = useState("")
  const [social, setSocial] = useState("")
/////////////
  const [nameFocus, setNameFocus] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [personFocus, setPersonFocus] = useState(false)
  const [socialFocus, setSocialFocus] = useState(false)
  const [channelFocus, setChannelFocus] = useState(false)
/////////////
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [personError, setPersonError] = useState(false)
  const [socialError, setSocialError] = useState(false)
  const [channelError, setChannelError] = useState(false)
  /////////////

  const submitForm = () => {

  }

  const nextStep = () => {
    if (formData.email && formData.name && (formData.person || person)) {
      setCurStep(1)
    } else {
      !formData.name && setNameError(true)
      !formData.email && setEmailError(true)
      !(formData.person || person) && setPersonError(true)
    }
  }

  console.log(formData);


  return (
    <motion.div 
      initial={{x: 5000}}
      animate={{x: contactOpened ? 0 : 5000}}
      transition={{x: {type: "tween"}}}
      className='contact-form'
    >
      <div>
        <div className='contact-header'>
          <h1>Contact Form</h1>
          <svg className='leave' onClick={() => {setContactOpened(false);allowScroll()}} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20 20h-15.25c-.414 0-.75.336-.75.75s.336.75.75.75h15.75c.53 0 1-.47 1-1v-15.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm-1-17c0-.478-.379-1-1-1h-15c-.62 0-1 .519-1 1v15c0 .621.52 1 1 1h15c.478 0 1-.379 1-1zm-8.503 6.437 2.219-2.22c.146-.146.338-.219.53-.219.404 0 .751.325.751.75 0 .193-.073.384-.219.531l-2.22 2.22 2.222 2.222c.147.147.22.339.22.53 0 .427-.349.751-.75.751-.192 0-.385-.073-.531-.219l-2.222-2.223-2.223 2.223c-.146.146-.338.219-.53.219-.401 0-.751-.324-.751-.751 0-.191.073-.383.22-.53l2.222-2.222-2.219-2.22c-.146-.147-.219-.338-.219-.531 0-.425.346-.75.75-.75.192 0 .384.073.53.219z" fill-rule="nonzero"/></svg>
        </div>
        <div className='blocks'>
          {
            curStep === 0 ? 
            <div className='block'>
              <div className='field'>
                <input 
                    name='name'
                    onChange={e => changeFormData(e)}
                    id="name"
                    value={formData.name}
                    onFocus={() => {setNameFocus(true);setNameError(false)}}
                    onBlur={() => setNameFocus(false)}
                  />
                <motion.label animate={(formData.name || nameFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ nameError ? " error" : ""}`} htmlFor="name">Name</motion.label>
              </div>
              <div className='field'>
                <input 
                    name='email'
                    onChange={e => changeFormData(e)}
                    id="email"
                    value={formData.email}
                    onFocus={() => {setEmailFocus(true);setEmailError(false)}}
                    onBlur={() => setEmailFocus(false)}
                  />
                <motion.label animate={(formData.email || emailFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ emailError ? " error" : ""}`} htmlFor="email">E-mail</motion.label>
              </div>
              <div className='field'>
                <ul className='socials'>
                  <h2>Who are you?</h2>
                  <li className='social-b'>
                    <input 
                      name='input'
                      id='inp1'
                      type="radio"
                      onClick={(e) => {
                        if (e.target.checked) {
                          setPerson("Creator")
                          setFormData(prev => ({...prev, person: ""}))
                        }
                      }}
                    />
                    <label className={personError ? "error" : ""} htmlFor='inp1'>Content creator</label>
                  </li>
                  <li className='social-b'>
                    <input 
                      name='input'
                      id='inp2'
                      type="radio"
                      onClick={(e) => {
                        if (e.target.checked) {
                          setPerson("Fan")
                          setFormData(prev => ({...prev, person: ""}))
                        }
                      }}
                    />
                    <label className={personError ? "error" : ""} htmlFor='inp2'>Fan</label>
                  </li>
                  <li className='social-b'>
                    <input 
                      name='input'
                      id='inp3'
                      type="radio"
                      onClick={(e) => e.target.checked && setPerson("Other")}
                    />
                    <label className={personError ? "error" : ""} htmlFor='inp3'>Other</label>
                  </li>
                </ul>
                <div className='content-wrapper'>
                  <motion.div 
                    initial={{height: 0}}
                    animate={{height: person === "Other" ? "100%" : "0"}}
                    className='content-other'
                    transition={{type: "keyframes", stiffness: 100}}
                  >
                    <input 
                        name='person'
                        onChange={e => changeFormData(e)}
                        id="person"
                        // disabled={social === "Other" ? "false" : "true"}
                        value={formData.person}
                        onFocus={() => {setPersonFocus(true);setPersonError(false)}}
                        onBlur={() => setPersonFocus(false)}
                      />
                    <motion.label style={{cursor: person === "Other" ? "text" : "default"}} animate={(formData.person || personFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ personError ? " error" : ""}`} htmlFor="person">You</motion.label>            
                  </motion.div>
                </div>
              </div>
            </div>
            
            :

            <div className='block'>
              <button onClick={() => setCurStep(0)}>BACK</button>
              <div className='field'>
                <ul className='socials'>
                  <h2>What social media do you work in?</h2>
                  <li className='social-b'>
                    <input 
                      name='input'
                      id='inp1'
                      type="radio"
                      onClick={(e) => {
                        if (e.target.checked) {
                          setSocial("YouTube")
                          setFormData(prev => ({...prev, social: ""}))
                        }
                      }}
                    />
                    <label className={personError ? "error" : ""} htmlFor='inp1'>YouTube</label>
                  </li>
                  <li className='social-b'>
                    <input 
                      name='input'
                      id='inp2'
                      type="radio"
                      onClick={(e) => {
                        if (e.target.checked) {
                          setSocial("Instagram")
                          setFormData(prev => ({...prev, social: ""}))
                        }
                      }}
                    />
                    <label className={personError ? "error" : ""} htmlFor='inp2'>Instagram</label>
                  </li>
                  <li className='social-b'>
                    <input 
                      name='input'
                      id='inp3'
                      type="radio"
                      onClick={(e) => {
                        if (e.target.checked) {
                          setSocial("Twitch")
                          setFormData(prev => ({...prev, social: ""}))
                        }
                      }}
                    />
                    <label className={personError ? "error" : ""} htmlFor='inp3'>Twitch</label>
                  </li>
                  <li className='social-b'>
                    <input 
                      name='input'
                      id='inp4'
                      type="radio"
                      onClick={(e) => {
                        if (e.target.checked) {
                          setSocial("TikTok")
                          setFormData(prev => ({...prev, social: ""}))
                        }
                      }}
                    />
                    <label className={socialError ? "error" : ""} htmlFor='inp4'>TikTok</label>
                  </li>
                  <li className='social-b'>
                    <input 
                      name='input'
                      id='inp5'
                      type="radio"
                      onClick={(e) => e.target.checked && setSocial("Other")}
                    />
                    <label className={socialError ? "error" : ""} htmlFor='inp5'>Other</label>
                  </li>
                </ul>
              </div>
              <div className='social-wrapper'>
                <motion.div 
                  initial={{height: 0}}
                  animate={{height: social === "Other" ? "100%" : "0"}}
                  className='social-other'
                  transition={{type: "keyframes", stiffness: 100}}
                >
                  <input 
                      name='social'
                      onChange={e => changeFormData(e)}
                      id="social"
                      // disabled={social === "Other" ? "false" : "true"}
                      value={formData.social}
                      onFocus={() => {setSocialFocus(true);setSocialError(false)}}
                      onBlur={() => setSocialFocus(false)}
                    />
                  <motion.label style={{cursor: social === "Other" ? "text" : "default"}} animate={(formData.social || socialFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ socialError ? " error" : ""}`} htmlFor="social">Social</motion.label>            
                </motion.div>
              </div>
              <div className='field'>
              <ul className='socials'>
                  <h2>How many subscribers do you have?</h2>
                  <li className='social-b'>
                    <input 
                      name='input_num'
                      id='inp_num1'
                      type="radio"
                      onClick={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({...prev, subscribers: "50000"}))
                        }
                      }}
                    />
                    <label className={personError ? "error" : ""} htmlFor='inp_num1'>{">"}50 000</label>
                  </li>
                  <li className='social-b'>
                    <input 
                      name='input_num'
                      id='inp_num2'
                      type="radio"
                      onClick={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({...prev, subscribers: "100000"}))
                        }
                      }}
                    />
                    <label className={personError ? "error" : ""} htmlFor='inp_num2'>{">"}100 000</label>
                  </li>
                  <li className='social-b'>
                    <input 
                      name='input_num'
                      id='inp_num3'
                      type="radio"
                      onClick={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({...prev, subscribers: "250000"}))
                        }
                      }}
                    />
                    <label className={personError ? "error" : ""} htmlFor='inp_num3'>{">"}250 000</label>
                  </li>
                  <li className='social-b'>
                    <input 
                      name='input_num'
                      id='inp_num4'
                      type="radio"
                      onClick={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({...prev, subscribers: "500000"}))
                        }
                      }}
                    />
                    <label className={personError ? "error" : ""} htmlFor='inp_num4'>{">"}500 000</label>
                  </li>
                  <li className='social-b'>
                    <input 
                      name='input_num'
                      id='inp_num5'
                      type="radio"
                      onClick={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({...prev, subscribers: "1000000"}))
                        }
                      }}
                    />
                    <label className={personError ? "error" : ""} htmlFor='inp_num5'>{">"}1 000 000</label>
                  </li>
                </ul>
              </div>
              <div className='field'>
                <input 
                    name='channel'
                    onChange={e => changeFormData(e)}
                    id="channel"
                    value={formData.channel}
                    onFocus={() => {setChannelFocus(true);setChannelError(false)}}
                    onBlur={() => setChannelFocus(false)}
                  />
                <motion.label animate={(formData.channel || channelFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ channelError ? " error" : ""}`} htmlFor="channel">Channel link</motion.label>
              </div>
                {[...Array(linkQuantity)].map((x, i) => 
                  <div className='field'>
                    <NewSocialNetworkLink q={i} formData={formData} changeFormData={changeFormData} setLinkQuantity={setLinkQuantity}/>
                  </div>
                )}
              </div>
          }
        </div>
      </div>
      <div className='proceed-block'>
        <div className='steps'>
          <div className='step'/>
          <div className='step'/>
          <motion.div animate={{x: `${curStep * 21}px`}} className='current-step'/>
        </div>
        <button onClick={curStep === 0 ? nextStep : submitForm}>{curStep === 0 ? "PROCEED" : "SUBMIT"}</button>
      </div>
    </motion.div>
  )
}

const NewSocialNetworkLink = ({ q, formData, changeFormData, setLinkQuantity }) => {
  const [focus, setFocus] = useState(false)
  const [error, setError] = useState(false)
  const [changed, setChanged] = useState(false)

  const value = formData[`link-${q}`]

  useEffect(() => {
    changed && setLinkQuantity(prev => prev + 1)
  }, [changed])

  return ( 
    <div className='additional-link'>
      <input 
        name={`link-${q}`}
        onChange={e => {changeFormData(e);setChanged(true)}}
        // onChange={e => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))}
        // onChange={e => setFormData(prev => ({...prev, links: {...prev.links, [e.target.name]: e.target.value}}))}
        id={`link-${q}`}
        value={value}
        onFocus={() => {setFocus(true);setError(false)}}
        onBlur={() => setFocus(false)}
      />
      <motion.label animate={(formData[`link-${q}`] || focus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ error ? " error" : ""}`} htmlFor={`link-${q}`}>Link</motion.label>
    </div>
  )
}

export default ContactForm