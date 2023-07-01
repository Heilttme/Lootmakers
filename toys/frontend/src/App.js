import "./styles/index.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Header, Footer, Home, ScrollImages3D, Cart, Item } from "./components"
import { useEffect, useRef, useState } from "react";
import axios from "axios"

function App() {
  const [items, setItems] = useState([])
  const [reviews, setReviews] = useState([])

  const storeRef = useRef(null)

  useEffect(() => {
    const res1 = axios.get("http://127.0.0.1:8000/api/get_items/").then(item => setItems(item.data.data))
    const res2 = axios.get("http://127.0.0.1:8000/api/get_reviews/").then(item => setReviews(item.data.data))
  }, [])
  
  return (
    <Router>
      <div className="a">
        <Header storeRef={storeRef} />
        {/* <ScrollImages3D images={images}/> */}
        <main>
          <Routes>
            <Route path="/" element={<Home reviews={reviews} storeRef={storeRef} items={items} />}/>
            <Route path="/items/:id" element={<Item items={items} />}/>
          </Routes>
        </main>
        <Footer/>
      </div>
      <Cart />
    </Router>
  )
}

export default App;

const images = [
  "craig-shoulderrider_00000.jpg",
  "craig-shoulderrider_00001.jpg",
  "craig-shoulderrider_00002.jpg",
  "craig-shoulderrider_00003.jpg",
  "craig-shoulderrider_00004.jpg",
  "craig-shoulderrider_00005.jpg",
  "craig-shoulderrider_00006.jpg",
  "craig-shoulderrider_00007.jpg",
  "craig-shoulderrider_00008.jpg",
  "craig-shoulderrider_00009.jpg",
  "craig-shoulderrider_00010.jpg",
  "craig-shoulderrider_00011.jpg",
  "craig-shoulderrider_00012.jpg",
  "craig-shoulderrider_00013.jpg",
  "craig-shoulderrider_00014.jpg",
  "craig-shoulderrider_00015.jpg",
  "craig-shoulderrider_00016.jpg",
  "craig-shoulderrider_00017.jpg",
  "craig-shoulderrider_00018.jpg",
  "craig-shoulderrider_00019.jpg",
  "craig-shoulderrider_00020.jpg",
  "craig-shoulderrider_00021.jpg",
  "craig-shoulderrider_00022.jpg",
  "craig-shoulderrider_00023.jpg",
  "craig-shoulderrider_00024.jpg",
  "craig-shoulderrider_00025.jpg",
  "craig-shoulderrider_00026.jpg",
  "craig-shoulderrider_00027.jpg",
  "craig-shoulderrider_00028.jpg",
  "craig-shoulderrider_00029.jpg",
  "craig-shoulderrider_00030.jpg",
  "craig-shoulderrider_00031.jpg",
  "craig-shoulderrider_00032.jpg",
  "craig-shoulderrider_00033.jpg",
  "craig-shoulderrider_00034.jpg",
  "craig-shoulderrider_00035.jpg",
]