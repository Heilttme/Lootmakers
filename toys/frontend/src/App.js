import "./styles/index.css"
import { BrowserRouter as Router, json, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { AgeRestriction, Header, Footer, Home, ScrollImages3D, Cart, Item, QuickShop, useBlockScroll, Contact, ContactForm, ALogin, CAP, PageNotFound, MobileNav } from "./components"
import { useEffect, useRef, useState } from "react";
import axios from "axios"
import useStore from "./store";
import { useTranslation } from "react-i18next"

function App() {
  const [items, setItems] = useState([])
  const [reviews, setReviews] = useState([])
  const [displayImages, setDisplayImages] = useState([])
  const [quickShop, setQuickShop] = useState(false)
  const [cartOpened, setCartOpened] = useState(false)
  const [contactOpened, setContactOpened] = useState(false)
  const [blockScroll, allowScroll] = useBlockScroll()
  const cart = useStore(state => state.cart)
  const addToStateCart = useStore(state => state.add)
  const storeRef = useRef(null)
  const [mobile] = useState((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
  const [blockAdmin, setBlockAdmin] = useState("Add")
  const [menuOpened, setMenuOpened] = useState(false)
  const [authorized, setAuthorized] = useState(false) 
  const [censored, setCensored] = useState(true)
  const [ageRestriction, setAgeRestriction] = useState(false)

  /// filters states
  
  const [[stockFilter, setStockFilter], [typeFilter, setTypeFilter], [vendorFilter, setVendorFilter]] = [useState(false), useState(false), useState(false)]
  const [[stockFilterPanel, setStockFilterPanel], [typeFilterPanel, setTypeFilterPanel], [vendorFilterPanel, setVendorFilterPanel]] = [useState(false), useState(false), useState(false)]

  ///

  useEffect(() => {
    const res1 = axios.get("http://127.0.0.1:8000/api/get_items/").then(item => setItems(item.data.data))
    const res2 = axios.get("http://127.0.0.1:8000/api/get_reviews/").then(item => setReviews(item.data.data))
    const res3 = axios.get("http://127.0.0.1:8000/api/get_display_images/").then(item => setDisplayImages(item.data.data))
  }, [])
  
  const {t, i18n} = useTranslation()
  
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }
  
  useEffect(() => {
    if (!localStorage.getItem("i")){
      localStorage.setItem("i", JSON.stringify([]))
    } else {
      let Citems = localStorage.getItem("i")
      if (Citems) {
        Citems = JSON.parse(Citems)
        Citems.map(item => !cart.map(cartItem => cartItem.id).includes(item.id) && addToStateCart(item))
      }
    }
  }, [])

  useEffect(() => {
    
  })
  
  const buttonRef = useRef(null)
  const cartCounterRef = useRef(null)

  const timerRef = useRef(null)

  const addToCart = (item) => {
    if (!cart.filter(i => i.id === item.id).length) {
      addToStateCart(items.filter(i => i.id === item.id)[0])
      const Citems = JSON.parse(localStorage.getItem("i"))
      localStorage.setItem("i", JSON.stringify([...Citems, items.filter(i => parseInt(i.id) === parseInt(item.id))[0]]))
      if (cartCounterRef.current !== null) cartCounterRef.current.className = "count scaled"
      setTimeout(() => {
        if (cartCounterRef.current !== null) cartCounterRef.current.className = "count"
      }, 500)
    } else {
      buttonRef.current.className = "shaking"
      setTimeout(() => {
        if (buttonRef.current !== null) buttonRef.current.className = ""
      }, 400)
    }
  }

  return (
    <Router>
      <div onClick={() => {
        quickShop && setQuickShop(null)
        cartOpened && setCartOpened(false)
        contactOpened && setContactOpened(false)
        setStockFilter(false)
        setTypeFilter(false)
        setVendorFilter(false)
        setStockFilterPanel(false)
        setTypeFilterPanel(false)
        setVendorFilterPanel(false)
        !ageRestriction && allowScroll()
      }} className="wrapper">
        <div className="a" style={{filter: (contactOpened || quickShop || cartOpened || ageRestriction) ? "brightness(35%)" : "unset", pointerEvents: (contactOpened || quickShop || cartOpened || ageRestriction) ? "none" : "unset"}}>
          <Header setBlockAdmin={setBlockAdmin} blockAdmin={blockAdmin} blockScroll={blockScroll} allowScroll={allowScroll} cartCounterRef={cartCounterRef} cart={cart} changeLanguage={changeLanguage} setCartOpened={setCartOpened} storeRef={storeRef} />
          <MobileNav menuOpened={menuOpened} setMenuOpened={setMenuOpened} blockScroll={blockScroll} allowScroll={allowScroll} cartCounterRef={cartCounterRef} cart={cart} changeLanguage={changeLanguage} setCartOpened={setCartOpened} storeRef={storeRef} />
          <main>
            <Routes>
              <Route path="/" element={<Home censored={censored} setCensored={setCensored} stockFilter={stockFilter} setStockFilter={setStockFilter} typeFilter={typeFilter} setTypeFilter={setTypeFilter} vendorFilter={vendorFilter} setVendorFilter={setVendorFilter} quickShop={quickShop} setQuickShop={setQuickShop} reviews={reviews} storeRef={storeRef} items={items} displayImages={displayImages} />}/>
              <Route path="/items/:id" element={<Item ageRestriction={ageRestriction} setAgeRestriction={setAgeRestriction} buttonRef={buttonRef} addToCart={addToCart} cart={cart} items={items} />}/>
              <Route path="/contact" element={<Contact setContactOpened={setContactOpened} />}/>
              <Route path="/admin/login" element={<ALogin setAuthorized={setAuthorized} />}/>
              <Route path="/admin/cms" element={<CAP setStockFilter={setStockFilterPanel} stockFilter={stockFilterPanel} typeFilter={typeFilterPanel} setTypeFilter={setTypeFilterPanel} vendorFilter={vendorFilterPanel} setVendorFilter={setVendorFilterPanel} setBlock={setBlockAdmin} block={blockAdmin} reviews={reviews} displayImages={displayImages} items={items} />}/>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
          <Footer storeRef={storeRef}/>
        </div>
      </div>
      {
        !mobile && 
        <QuickShop buttonRef={buttonRef} addToCart={addToCart} cart={cart} allowScroll={allowScroll} items={items} setQuickShop={setQuickShop} blockScroll={blockScroll} id={quickShop}/>
      }
      <Cart setMenuOpened={setMenuOpened} items={items} allowScroll={allowScroll} displayImages={displayImages} cart={cart} blockScroll={blockScroll} cartOpened={cartOpened} setCartOpened={setCartOpened} />
      <div className="contact-form-wrapper">
        <ContactForm allowScroll={allowScroll} blockScroll={blockScroll} setContactOpened={setContactOpened} contactOpened={contactOpened} />
      </div>
      { ageRestriction && 
        <AgeRestriction blockScroll={blockScroll} allowScroll={allowScroll} ageRestriction={ageRestriction} setAgeRestriction={setAgeRestriction}/>
      }
    </Router>
  )
}

export default App;