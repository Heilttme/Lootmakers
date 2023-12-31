import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { t } from 'i18next'
import Input from "./Input"

const ContactForm = ({ contactOpened, allowScroll, blockScroll, setContactOpened }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    person: "",
    social: "",
    channel: "",
    product: "",
    merch: "",
    contact: "",
  })

  useEffect(() => {
    contactOpened && blockScroll()
  }, [contactOpened])

  const [curStep, setCurStep] = useState(0)
  const [checkFormSubmit, setCheckFormSubmit] = useState("BEMS")

  const changeFormData = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [person, setPerson] = useState("")
/////////////
  const [personFocus, setPersonFocus] = useState(false)
/////////////
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [personError, setPersonError] = useState(false)
  /////////////

  const nextStep = () => {
    if (formData.email && formData.name && ((formData.person.length) || (person && person !== "Other"))) {
      setCurStep(1)
    } else {
      !formData.name && setNameError(true)
      !formData.email && setEmailError(true)
      !((formData.person.length && person !== "Other") || (person && person !== "Other")) && setPersonError(true)
    }
  }

  return (
    <motion.div 
      initial={{x: 5000}}
      animate={{x: contactOpened ? 0 : 5000}}
      transition={{x: {type: "tween"}}}
      className='contact-form'
    >
      {/* <div> */}
        <div className='contact-header'>
          <h1>{t("Contact Form")}</h1>
          <svg className='leave' onClick={() => {setContactOpened(false);allowScroll()}} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-8.991 6.932 2.717-2.718c.146-.146.338-.219.53-.219.405 0 .751.325.751.75 0 .193-.073.384-.219.531l-2.718 2.717 2.728 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.531-.219l-2.728-2.728-2.728 2.728c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .384.073.53.219z" fill-rule="nonzero"/></svg>
        </div>
        <div className='blocks'>
          {
            curStep === 0 ? 
            <div className='block'>
              <Input question={""} label={"name"} onChange={(e) => changeFormData(e)} value={formData.name} error={nameError} setError={setNameError} />
              <Input question={""} label={"email"} onChange={(e) => changeFormData(e)} value={formData.email} error={emailError} setError={setEmailError} />
              <div className='field'>
                <ul className='socials'>
                  <h2>{t("Who are you?")}</h2>
                  <li className='social-b'>
                    <input 
                      name='input'
                      id='inp1'
                      type="radio"
                      checked={person === "Creator" && true}
                      onClick={(e) => {
                        if (e.target.checked) {
                          setPerson("Creator")
                          setFormData(prev => ({...prev, person: ""}))
                          setPersonError(false)
                        }
                      }}
                    />
                    <motion.label animate={{color: personError ? "rgb(247, 61, 61)" : "rgb(0, 0, 0)"}} htmlFor='inp1'>{t("Content creator")}</motion.label>
                  </li>
                  <li className='social-b'>
                    <input 
                      name='input'
                      id='inp2'
                      type="radio"
                      checked={person === "Fan" && true}
                      onClick={(e) => {
                        if (e.target.checked) {
                          setPerson("Fan")
                          setFormData(prev => ({...prev, person: ""}))
                          setPersonError(false)
                        }
                      }}
                    />
                    <motion.label animate={{color: personError ? "rgb(247, 61, 61)" : "rgb(0, 0, 0)"}} className={personError ? "error" : ""} htmlFor='inp2'>{t("Fan")}</motion.label>
                  </li>
                  <li className='social-b'>
                    <input 
                      name='input'
                      id='inp3'
                      type="radio"
                      checked={person === "Other" && true}
                      onClick={(e) => {
                        e.target.checked && setPerson("Other")
                        e.target.checked && setPersonError(false)
                      }}
                    />
                    <motion.label animate={{color: personError ? "rgb(247, 61, 61)" : "rgb(0, 0, 0)"}} className={personError ? "error" : ""} htmlFor='inp3'>{t("Other")}</motion.label>
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
                    <motion.label style={{cursor: person === "Other" ? "text" : "default"}} animate={(formData.person || personFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ personError ? " error" : ""}`} htmlFor="person">{t("You")}</motion.label>            
                  </motion.div>
                </div>
              </div>
            </div>
            
            : curStep === 1 ?

              person === "Creator" ?
                <ContentCreatorForm checkFormSubmit={checkFormSubmit} setCurStep={setCurStep} setFormData={setFormData} formData={formData} changeFormData={changeFormData} />
              : person === "Fan" ?
                <FanForm checkFormSubmit={checkFormSubmit} setCurStep={setCurStep} setFormData={setFormData} formData={formData} changeFormData={changeFormData}/>
              :
                <OtherPersonForm checkFormSubmit={checkFormSubmit} setCurStep={setCurStep} setFormData={setFormData} formData={formData} changeFormData={changeFormData}/>

            :
            <div className='submitted-form'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"/></svg>
              <h2>{t("Thank you!")}</h2>
              <p>{t("Your form was successfully submitted")}</p>
              <t>{t("We'll contact you later")}</t>
            </div>
          }
        </div>
      {/* </div> */}
      {
        curStep !== 2 &&
        <div className='proceed-wrapper'>
          <div className='proceed-block'>
            <div className='steps'>
              <div onClick={() => setCurStep(0)} className='step'/>
              <div onClick={nextStep} className='step'/>
              <motion.div animate={{x: `${curStep * 21}px`}} className='current-step'/>
            </div>
            <button onClick={curStep === 0 ? nextStep : () => setCheckFormSubmit(prev => prev === "BEMS" ? true : !prev)}>{curStep === 0 ? t("PROCEED") : t("SUBMIT")}</button>
          </div>
        </div>
      }
    </motion.div>
  )
}

const ContentCreatorForm = ({ checkFormSubmit, formData, setFormData, changeFormData, setCurStep }) => {
  const [social, setSocial] = useState("")
  const [linkQuantity, setLinkQuantity] = useState(1)
  
  const [socialFocus, setSocialFocus] = useState(false)

  const [socialError, setSocialError] = useState(false)
  const [numberError, setNumberError] = useState(false)
  const [channelError, setChannelError] = useState(false)
  const [productError, setProductError] = useState(false)
  const [merchError, setMerchError] = useState(false)
  const [contactError, setContactError] = useState(false)

  useEffect(() => {
    if ((formData.social || (social && social !== "Other")) && formData.channel && formData.product && formData.contact && formData.subscribers) {
      setCurStep(2)
    } else if (checkFormSubmit !== "BEMS") {
      !(formData.social || (social && social !== "Other")) && setSocialError(true)
      !formData.subscribers && setNumberError(true)
      !formData.channel && setChannelError(true)
      !formData.product && setProductError(true)
      !formData.contact && setContactError(true)
    }
  }, [checkFormSubmit])
  
  return (
    <div className='block'>
      <div className='field radio-field'>
        <ul className='socials'>
          <h2>{t("What social media do you work in?")}</h2>
          <li className='social-b'>
            <input 
              name='input'
              id='inp1'
              type="radio"
              onClick={(e) => {
                if (e.target.checked) {
                  setSocial("YouTube")
                  setFormData(prev => ({...prev, social: ""}))
                  setSocialError(false)
                }
              }}
            />
            <label className={socialError ? "error" : ""} htmlFor='inp1'>YouTube</label>
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
                  setSocialError(false)
                }
              }}
            />
            <label className={socialError ? "error" : ""} htmlFor='inp2'>Instagram</label>
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
                  setSocialError(false)
                }
              }}
            />
            <label className={socialError ? "error" : ""} htmlFor='inp3'>Twitch</label>
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
                  setSocialError(false)
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
            <label className={socialError ? "error" : ""} htmlFor='inp5'>{t("Other")}</label>
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
              value={formData.social}
              onFocus={() => {setSocialFocus(true);setSocialError(false)}}
              onBlur={() => setSocialFocus(false)}
            />
          <motion.label style={{cursor: social === "Other" ? "text" : "default"}} animate={(formData.social || socialFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ socialError ? " error" : ""}`} htmlFor="social">{t("Social")}</motion.label>            
        </motion.div>
      </div>
      <div className='field radio-field'>
        <ul className='socials'>
          <h2>{t("How many subscribers do you have?")}</h2>
          <li className='social-b'>
            <input 
              name='input_num'
              id='inp_num1'
              type="radio"
              onClick={(e) => {
                if (e.target.checked) {
                  setFormData(prev => ({...prev, subscribers: "50000"}))
                  setNumberError(false)
                }
              }}
            />
            <label className={numberError ? "error" : ""} htmlFor='inp_num1'>{">"}50 000</label>
          </li>
          <li className='social-b'>
            <input 
              name='input_num'
              id='inp_num2'
              type="radio"
              onClick={(e) => {
                if (e.target.checked) {
                  setFormData(prev => ({...prev, subscribers: "100000"}))
                  setNumberError(false)
                }
              }}
            />
            <label className={numberError ? "error" : ""} htmlFor='inp_num2'>{">"}100 000</label>
          </li>
          <li className='social-b'>
            <input 
              name='input_num'
              id='inp_num3'
              type="radio"
              onClick={(e) => {
                if (e.target.checked) {
                  setFormData(prev => ({...prev, subscribers: "250000"}))
                  setNumberError(false)
                }
              }}
            />
            <label className={numberError ? "error" : ""} htmlFor='inp_num3'>{">"}250 000</label>
          </li>
          <li className='social-b'>
            <input 
              name='input_num'
              id='inp_num4'
              type="radio"
              onClick={(e) => {
                if (e.target.checked) {
                  setFormData(prev => ({...prev, subscribers: "500000"}))
                  setNumberError(false)
                }
              }}
            />
            <label className={numberError ? "error" : ""} htmlFor='inp_num4'>{">"}500 000</label>
          </li>
          <li className='social-b'>
            <input 
              name='input_num'
              id='inp_num5'
              type="radio"
              onClick={(e) => {
                if (e.target.checked) {
                  setFormData(prev => ({...prev, subscribers: "1000000"}))
                  setNumberError(false)
                }
              }}
            />
            <label className={numberError ? "error" : ""} htmlFor='inp_num5'>{">"}1 000 000</label>
          </li>
        </ul>
      </div>
      <Input question={""} label={"channel"} onChange={(e) => changeFormData(e)} value={formData.channel} error={channelError} setError={setChannelError} />
        {[...Array(linkQuantity)].map((_, i) => 
        <div className='field flex'>
          <NewSocialNetworkLink q={i} formData={formData} changeFormData={changeFormData} linkQuantity={linkQuantity} setLinkQuantity={setLinkQuantity}/>
          <div data-hover={t("Other social networks links (Boosty, etc)")} className='question-mark'>
            <div className='question-wrapper'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"/></svg>
            </div>
          </div>
        </div>
        )}
      <Input question={t("What would you like to make with LootMakers")} label={"product"} onChange={(e) => changeFormData(e)} value={formData.product} error={productError} setError={setProductError} />
      <Input question={t("If you already have any merch leave a link on it")} label={"merch"} onChange={(e) => changeFormData(e)} value={formData.merch} error={merchError} setError={setMerchError} />
      <Input question={""} label={"contact"} onChange={(e) => changeFormData(e)} value={formData.contact} error={contactError} setError={setContactError} />
    </div>
  )
}

const FanForm = ({ checkFormSubmit, formData, setFormData, changeFormData, setCurStep }) => {
  const [social, setSocial] = useState("")
  
  const [socialFocus, setSocialFocus] = useState(false)

  const [socialError, setSocialError] = useState(false)
  const [numberError, setNumberError] = useState(false)
  const [channelError, setChannelError] = useState(false)
  const [merchError, setMerchError] = useState(false)
  
  useEffect(() => {
    if ((formData.social || (social && social !== "Other")) && formData.channel && formData.subscribers) {
      setCurStep(2)
    } else if (checkFormSubmit !== "BEMS") {
    }
    !(formData.social || (social && social !== "Other")) && setSocialError(true)
    !formData.channel && setChannelError(true)
    !formData.subscribers && setNumberError(true)
  }, [checkFormSubmit])
  
  return (
    <div className='block'>
      <div className='field radio-field'>
        <ul className='socials'>
          <h2>{t("What social media do they work in?")}</h2>
          <li className='social-b'>
            <input 
              name='input'
              id='inp1'
              type="radio"
              onClick={(e) => {
                if (e.target.checked) {
                  setSocial("YouTube")
                  setFormData(prev => ({...prev, social: ""}))
                  setSocialError(false)
                }
              }}
            />
            <label className={socialError ? "error" : ""} htmlFor='inp1'>YouTube</label>
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
                  setSocialError(false)
                }
              }}
            />
            <label className={socialError ? "error" : ""} htmlFor='inp2'>Instagram</label>
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
                  setSocialError(false)
                }
              }}
            />
            <label className={socialError ? "error" : ""} htmlFor='inp3'>Twitch</label>
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
                  setSocialError(false)
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
            <label className={socialError ? "error" : ""} htmlFor='inp5'>{t("Other")}</label>
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
              value={formData.social}
              onFocus={() => {setSocialFocus(true);setSocialError(false)}}
              onBlur={() => setSocialFocus(false)}
            />
          <motion.label style={{cursor: social === "Other" ? "text" : "default"}} animate={(formData.social || socialFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ socialError ? " error" : ""}`} htmlFor="social">{t("Social")}</motion.label>            
        </motion.div>
      </div>
      <div className='field radio-field'>
        <ul className='socials'>
          <h2>{t("How many subscribers do they have?")}</h2>
          <li className='social-b'>
            <input 
              name='input_num'
              id='inp_num1'
              type="radio"
              onClick={(e) => {
                if (e.target.checked) {
                  setFormData(prev => ({...prev, subscribers: "50000"}))
                  setNumberError(false)
                }
              }}
            />
            <label className={numberError ? "error" : ""} htmlFor='inp_num1'>{">"}50 000</label>
          </li>
          <li className='social-b'>
            <input 
              name='input_num'
              id='inp_num2'
              type="radio"
              onClick={(e) => {
                if (e.target.checked) {
                  setFormData(prev => ({...prev, subscribers: "100000"}))
                  setNumberError(false)
                }
              }}
            />
            <label className={numberError ? "error" : ""} htmlFor='inp_num2'>{">"}100 000</label>
          </li>
          <li className='social-b'>
            <input 
              name='input_num'
              id='inp_num3'
              type="radio"
              onClick={(e) => {
                if (e.target.checked) {
                  setFormData(prev => ({...prev, subscribers: "250000"}))
                  setNumberError(false)
                }
              }}
            />
            <label className={numberError ? "error" : ""} htmlFor='inp_num3'>{">"}250 000</label>
          </li>
          <li className='social-b'>
            <input 
              name='input_num'
              id='inp_num4'
              type="radio"
              onClick={(e) => {
                if (e.target.checked) {
                  setFormData(prev => ({...prev, subscribers: "500000"}))
                  setNumberError(false)
                }
              }}
            />
            <label className={numberError ? "error" : ""} htmlFor='inp_num4'>{">"}500 000</label>
          </li>
          <li className='social-b'>
            <input 
              name='input_num'
              id='inp_num5'
              type="radio"
              onClick={(e) => {
                if (e.target.checked) {
                  setFormData(prev => ({...prev, subscribers: "1000000"}))
                  setNumberError(false)
                }
              }}
            />
            <label className={numberError ? "error" : ""} htmlFor='inp_num5'>{">"}1 000 000</label>
          </li>
        </ul>
      </div>
      <Input question ={""} label={"channel"} onChange={(e) => changeFormData(e)} value={formData.channel} error={channelError} setError={setChannelError} />
      <Input question={"If they already have any merch leave a link on it"} label={"merch"} onChange={(e) => changeFormData(e)} value={formData.merch} error={merchError} setError={setMerchError} />
    </div>
  )
}

const OtherPersonForm = ({ checkFormSubmit, formData, setFormData, changeFormData, setCurStep }) => {
  const [aboutFocus, setAboutFocus] = useState(false)
  const [aboutError, setAboutError] = useState(false)

  useEffect(() => {
    if (formData.about) {
      setCurStep(2)
    } else if (checkFormSubmit !== "BEMS") {
      !formData.about && setAboutError(true)
    }
  }, [checkFormSubmit])
  
  return (
    <div className='block'>
      <div className='field flex'>
        <textarea 
            name='about'
            onChange={e => changeFormData(e)}
            id="about"
            value={formData.about}
            onFocus={() => {setAboutFocus(true);setAboutError(false)}}
            onBlur={() => setAboutFocus(false)}
          />
        <motion.label animate={(formData.about || aboutFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label${ aboutError ? " error" : ""}`} htmlFor="about">{t("About you")}</motion.label>
        <div data-hover={t("Tell us about you")} className='question-mark'>
          <div className='question-wrapper'>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"/></svg>
          </div>
        </div>
      </div>
    </div>
  )
}


const NewSocialNetworkLink = ({ q, formData, changeFormData, setLinkQuantity, linkQuantity }) => {
  const [focus, setFocus] = useState(false)
  const [error, setError] = useState(false)
  const [changed, setChanged] = useState(false)

  const value = formData[`link-${q}`]

  
  useEffect(() => {
    linkQuantity === (q + 1) && changed && setLinkQuantity(prev => prev + 1)
  }, [changed])

  return ( 
    <motion.div 
      initial={{height: 0}}
      animate={{height: "100%"}}
      transition={{type: "keyframes", stiffness: 100}}
      className='additional-link'
    >
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
      <motion.label animate={(formData[`link-${q}`] || focus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {color: error ? "rgb(247, 61, 61)" : "rgb(255, 255, 255)"}} transition={{color: {stiffness: 100}}} className={`text-label${ error ? " error" : ""}`} htmlFor={`link-${q}`}>{t("Link")}</motion.label>
    </motion.div>
  )
}

export default ContactForm