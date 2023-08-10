import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import axios, { all } from 'axios'
import useStore from "../store";
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import Input from './Input';

const Cart = ({ storeRef, setPromoApplied, promoApplied, total, setTotal, setMenuOpened, items, displayImages, setCartOpened, cartOpened, allowScroll, blockScroll }) => {
  const incQuantity = useStore(state => state.increment)
  const decQuantity = useStore(state => state.decrement)
  const cart = useStore(state => state.cart)
  const [step, setStep] = useState(0)
  
  useEffect(() => {
    setTimeout(() => cartOpened && blockScroll(), 220)

    return () => allowScroll()
  }, [cartOpened])

  return (
    <motion.div 
      initial={{x: 3000}}
      animate={{x: cartOpened ? 0 : 3000}}
      transition={{x: {type: "tween"}}}
      className='cart'
    >
      <div className='cart-blocks-wrapper'>
        <div className='cart-header'>
          <p>{t("CART")}</p>
          <svg className='leave' onClick={() => {setCartOpened(false);allowScroll()}} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-8.991 6.932 2.717-2.718c.146-.146.338-.219.53-.219.405 0 .751.325.751.75 0 .193-.073.384-.219.531l-2.718 2.717 2.728 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.531-.219l-2.728-2.728-2.728 2.728c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .384.073.53.219z" fill-rule="nonzero"/></svg>
        </div>

        <CartList storeRef={storeRef} step={step} setStep={setStep} total={total} setTotal={setTotal} setPromoApplied={setPromoApplied} promoApplied={promoApplied} setMenuOpened={setMenuOpened} items={items} cart={cart} displayImages={displayImages} setCartOpened={setCartOpened} incQuantity={incQuantity} decQuantity={decQuantity}/>
        
        <Delivery step={step}/>
      </div>
    </motion.div>
  )
}

const CartList = ({ storeRef, step, setStep, setTotal, cart, promoApplied, setPromoApplied, total, setMenuOpened, items, displayImages, setCartOpened, incQuantity, decQuantity }) => {
  const [proceedMove, setProceedMove] = useState(false)
  const cartItems = cart.map(item => (
    <CartItem setProceedMove={setProceedMove} setMenuOpened={setMenuOpened} key={item.id} items={items} cart={cart} item={item} displayImages={displayImages} setCartOpened={setCartOpened} incQuantity={incQuantity} decQuantity={decQuantity}/>
  ))
  const navigate = useNavigate()

  const [promoList, setPromoList] = useState(["promo"])
  const [promo, setPromo] = useState("")

  const applyPromo = () => {
    if (promoList.includes(promo)) {
      setPromoApplied(1)
      setPromo("")
    } else {
      setPromoApplied(2)
    }
  }

  useEffect(() => setTotal(cart.reduce((acc, it) => (it.price * it.quantity) + acc, 0).toFixed(2)), [cart])
  
  return (
    <motion.div 
      initial={{x: 0}}
      animate={{x: step === 0 ? 0 : -1200}}
      className='cart-block'
    >
    {
      cart.length !== 0 ?
      <div className='wrapper'>
        <div className='cart-items'> {/* add a wrapper to items to avoid animation failure and stick continue to it */}
          {cartItems}
          <div className='shopping'>
            <button 
              onClick={() => {
                navigate("/")
                setTimeout(() => storeRef.current?.scrollIntoView({behavior: "smooth"}), 100)
              }}
            >
              Go shopping
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M13.5 21c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m-6 2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m16.5-16h-2.964l-3.642 15h-13.321l-4.073-13.003h19.522l.728-2.997h3.75v1zm-22.581 2.997l3.393 11.003h11.794l2.674-11.003h-17.861z"/></svg>
            </button>
            {/* <div className='shopping-wrapper'>
              
            </div> */}
          </div>
        </div>
        <motion.div animate={{y: proceedMove ? 100 : 0}} transition={{duration: ".1"}} className='continue'>
          <div className='subtotal'>
            <p>Subtotal:</p>
            <h2>${promoApplied === 1 ? (total * 0.9).toFixed(2) : total}</h2>
            {promoApplied === 1 && <s>${total.toFixed(2)}</s>}
          </div>
          <div className='checkout'>
            <div className='promocode-block'>
              <input
                onChange={(e) => setPromo(e.target.value)}
                value={promo}
                placeholder="Enter your promocode here"
                style={{outline: promoApplied === 1 ? "1px solid rgb(52, 235, 52)" : promoApplied === 2 && "1px solid rgb(235, 55, 52)"}}
              />
              <button onClick={applyPromo}>{t("APPLY")}</button>
            </div>
            <button onClick={() => setStep(1)}>{t("PROCEED")}</button>
          </div>
        </motion.div>
      </div>
        :
      <div className='empty wrapper'>
        <svg className='cart-ic' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.299 3.74c-.207-.206-.299-.461-.299-.711 0-.524.407-1.029 1.02-1.029.262 0 .522.1.721.298l3.783 3.783c-.771.117-1.5.363-2.158.726l-3.067-3.067zm3.92 14.84l-.571 1.42h-9.296l-3.597-8.961-.016-.039h9.441c.171-.721.459-1.395.848-2h-14.028v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l1.21-3.015c-.698-.03-1.367-.171-1.991-.405zm-6.518-14.84c.207-.206.299-.461.299-.711 0-.524-.407-1.029-1.02-1.029-.261 0-.522.1-.72.298l-4.701 4.702h2.883l3.259-3.26zm13.299 8.76c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-3.086-2.122l-1.414 1.414-1.414-1.414-.707.708 1.414 1.414-1.414 1.414.707.708 1.414-1.414 1.414 1.414.708-.708-1.414-1.414 1.414-1.414-.708-.708z"/></svg>
        <h2>{t("Your cart is empty")}</h2>
      </div>
    }
    </motion.div>
  )
}


const CartItem = ({ setProceedMove, setMenuOpened, items, item, displayImages, setCartOpened, incQuantity, decQuantity }) => {
  const navigate = useNavigate()
  const [removedShadow, setRemovedShadow] = useState(false)
  const [removedItem, setRemovedItem] = useState(false)
  const removeFromCart = useStore(state => state.remove)
  const [timeout, addTimeout] = useState("")
  const cart = useStore(state => state.cart)

  const clickInc = () => {
    incQuantity(item)
    let newAr = []
    const cItems = JSON.parse(localStorage.getItem("i")).map(it => {
      if (it.id === item.id){
        newAr.push({...it, quantity: it.quantity !== 99 ? it.quantity + 1 < it.quantityAvailable ? it. quantity + 1 : it.quantityAvailable : 99})
      } else {
        newAr.push(it)
      }
    })
    console.log(newAr);
    localStorage.setItem("i", JSON.stringify(newAr))
  }

  const clickDec = () => {
    decQuantity(item)
    let newAr = []
    const cItems = JSON.parse(localStorage.getItem("i")).map(it => {
      if (it.id === item.id){
        newAr.push({...it, quantity: it.quantity !== 1 ? it.quantity - 1 : 1})
      } else {
        newAr.push(it)
      }
    })
    localStorage.setItem("i", JSON.stringify(newAr))
  }

  const startRemoving = (item) => {
    setRemovedShadow(true)
    addTimeout(
      setTimeout(() => {
        setRemovedShadow(false)
        setRemovedItem(true)
        setTimeout(() => {
          setRemovedItem(true)
          let Citems = JSON.parse(localStorage.getItem("i"))
          if (Citems.length === 1) {
            setProceedMove(true)
          }
        }, 200)
        setTimeout(() => setProceedMove(false), 500)
        setTimeout(() => {
          let Citems = JSON.parse(localStorage.getItem("i"))
          Citems = Citems.filter(i => parseInt(i.id) !== parseInt(item.id))
          localStorage.setItem("i", JSON.stringify([...Citems]))
          removeFromCart(items.filter(i => i.id === item.id)[0])
        }, 450)
      }, 5000)
    )
  }

  // useEffect(() => {
  //   if (cartItems.length === 0) {
  //     setProceedMove(true)
  //   }
  // }, [cartItems])

  const cancelRemove = () => {
    setRemovedShadow(false)
    clearTimeout(timeout)
  }

  return (
    <motion.div
      animate={{height: removedItem ? "0" : "auto"}}
      className='item-wrapper'
    >
      <motion.div
        animate={{filter: removedShadow ? "brightness(.25)" : "brightness(1)", pointerEvents: removedShadow ? "none" : "", userSelect: removedShadow ? "none" : ""}}
        transition={{duration: ".35"}}
        className='item'
      >
        <div onClick={() => startRemoving(item)} className='remove-btn-cross'>
          <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
        </div>
        <div className='item-inner'>
          <div className='i-nq'>
            <div className='img-wrapper'>
              <img onClick={() => {navigate(`/items/${item.id}`);setCartOpened(false);setMenuOpened(false)}} src={`http://127.0.0.1:8000${displayImages.length && displayImages.filter(image => image.item === item.id)[0].image}`}/>
              {
                item.orderType === "preorder" &&
                <div data-hover="This item is a preorder" className='pre'>
                  <div className='question-wrapper'>
                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-8c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z" fill-rule="nonzero"/></svg>
                  </div> 
                </div>
              }
            </div>
            <div className='n-q'>
              <div>
                <h2>{item.collection}</h2>
                <h1>{item.name}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className='remove'>
          <div className='quantity'>
            <button onClick={clickDec}>-</button>
            <p>{item.quantity}</p>
            <button onClick={clickInc}>+</button>
          </div>
          <p className='price'>${item.price} USD</p>
        </div>
      </motion.div>
      {
        removedShadow && 
          <div className='remove-warn'>
            <div></div>
            <h2>{t("Are you sure you want to remove this item?")}</h2>
            <div className='buttons'>
              <button onClick={cancelRemove}>{t("Undo")}</button>
            </div>
          </div>
      }
      {
        removedShadow && 
          <motion.div
            initial={{width: "100%"}}
            animate={{width: "0%"}}
            transition={{duration: "5", stiffness: 100}}
            className='line'
          />
      }
    </motion.div>
  )
}

const Delivery = ({ step, setStep }) => {
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

  const changeFormData = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const [proceedMove, setProceedMove] = useState(false)

  const [emailError, setEmailError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [surnameError, setSurnameError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [postalCodeError, setPostalCodeError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)

  return (
    <motion.div
      initial={{x: 1200}}
      animate={{x: step === 1 ? 0 : 1200}}
      className='delivery'
      transition={{ease: "easeInOut"}}
    >
      <div className='wrapper'>
        <div className='form'> {/* add a wrapper to items to avoid animation failure and stick continue to it */}
          <h2>Fill in delivery information</h2>
          <Input question={""} label={"email"} onChange={(e) => changeFormData(e)} value={formData.email} error={emailError} setError={setEmailError} />
          <div className='name-surname'>
            <Input question={""} label={"name"} onChange={(e) => changeFormData(e)} value={formData.name} error={nameError} setError={setNameError} />
            <Input question={""} label={"surname"} onChange={(e) => changeFormData(e)} value={formData.surname} error={surnameError} setError={setSurnameError} />
          </div>
          <Input question={""} label={"address"} onChange={(e) => changeFormData(e)} value={formData.address} error={addressError} setError={setAddressError} />
          <Input question={""} label={"postalCode"} onChange={(e) => changeFormData(e)} value={formData.postalCode} error={postalCodeError} setError={setPostalCodeError} />

          <Input question={""} label={"phone"} onChange={(e) => changeFormData(e)} value={formData.phone} error={phoneError} setError={setPhoneError} />
        </div>
        <motion.div animate={{y: proceedMove ? 100 : 0}} transition={{duration: ".1"}} className='continue'>
          <div className='checkout checkout-delivery'>
            <button onClick={() => setStep(1)}>{t("PROCEED")}</button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}


export default Cart