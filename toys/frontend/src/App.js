import "./styles/index.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Header, Footer, Home, ScrollImages3D, Cart, Item, QuickShop, useBlockScroll } from "./components"
import { useEffect, useRef, useState } from "react";
import axios from "axios"
import useStore from "./store";

function App() {
  const [items, setItems] = useState([])
  const [reviews, setReviews] = useState([])
  const [displayImages, setDisplayImages] = useState([])
  const [quickShop, setQuickShop] = useState(false)
  const [cartOpened, setCartOpened] = useState(false)
  const [blockScroll, allowScroll] = useBlockScroll()
  const cart = useStore(state => state.cart)

  const storeRef = useRef(null)

  useEffect(() => {
    const res1 = axios.get("http://127.0.0.1:8000/api/get_items/").then(item => setItems(item.data.data))
    const res2 = axios.get("http://127.0.0.1:8000/api/get_reviews/").then(item => setReviews(item.data.data))
    const res3 = axios.get("http://127.0.0.1:8000/api/get_display_images/").then(item => setDisplayImages(item.data.data))
  }, [])

  return (
    <Router>
      <div onClick={() => {
          quickShop && setQuickShop(false)
          cartOpened && setCartOpened(false)
          allowScroll()
        }} className="wrapper">
        <div className="a" style={{filter: (quickShop || cartOpened) ? "brightness(35%)" : "unset", pointerEvents: (quickShop || cartOpened) ? "none" : "unset"}}>
          <Header setCartOpened={setCartOpened} storeRef={storeRef} />
          {/* <ScrollImages3D images={images}/> */}
          <main>
            <Routes>
              <Route path="/" element={<Home quickShop={quickShop} setQuickShop={setQuickShop} reviews={reviews} storeRef={storeRef} items={items} displayImages={displayImages} />}/>
              <Route path="/items/:id" element={<Item items={items} />}/>
            </Routes>
          </main>
          <Footer/>
        </div>
      </div>
      <QuickShop items={items} setQuickShop={setQuickShop} blockScroll={blockScroll} id={quickShop}/>
      <Cart displayImages={displayImages} cart={cart} blockScroll={blockScroll} cartOpened={cartOpened} setCartOpened={setCartOpened} />
    </Router>
  )
}

export default App;