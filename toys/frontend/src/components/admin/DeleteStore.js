import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useWindowDimensions from '../useWindowDimensions'
import { motion } from "framer-motion"
import { cloneDeep } from "lodash"
import { t } from 'i18next'

const DeleteStore = ({ orderFilter, setOrderFilter, stockFilter, setStockFilter, typeFilter, setTypeFilter, vendorFilter, setVendorFilter, items, displayImages }) => {
  const [oneLineItems, setOneLineItems] = useState([])
  const [twoLineItems, setTwoLineItems] = useState([])
  const [threeLineItems, setThreeLineItems] = useState([])
  const { height, width } = useWindowDimensions()
  
  const [filterInput, setFilterInput] = useState("")
  const [filterFocus, setFilterFocus] = useState(false)
  
  const [filter, setFilter] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState({
    stock: [],
    type: [],
    vendor: [],
    order: [],
  })
  const [filteredItems, setFilteredItems] = useState(items)

  useEffect(() => {
    setFilteredItems(items)
  }, [items])

  useEffect(() => {
    let newItems = cloneDeep(items)
    const stock = appliedFilters.stock
    const type = appliedFilters.type
    const vendor = appliedFilters.vendor
    const order = appliedFilters.order
    
    if (stock.includes("in stock")) {
      newItems = newItems.filter(it => it.quantityAvailable >= 1)
    }

    if (stock.includes("out of stock")) {
      newItems = newItems.filter(it => it.quantityAvailable === 0)
    }

    if (stock.includes("all")) {
      newItems = items.filter(it => ((it.quantityAvailable === 0) || (it.quantityAvailable >= 1)))
    }

    if (filterInput !== -1) {
      newItems = newItems.filter(it => (it.name.toLowerCase().includes(filterInput.toLowerCase()) || it.collection.toLowerCase().includes(filterInput.toLowerCase())))
    }
    
    if (order.length){
      newItems = newItems.filter(it => order[0] === it.orderType)
    }

    if (vendor.length){
      newItems = newItems.filter(it => vendor[0] === it.madeBy)
    }

    if (type.length){
      newItems = newItems.filter(it => type[0] === it.type)
    }
    
    setFilteredItems(newItems)
  }, [appliedFilters, filterInput])

  useEffect(() => {
    const newItems = []
    let newAr = [] 
    for (let i = 0; i < filteredItems.length; i++) {
      newAr.push(filteredItems[i])
      if (newAr.length === 3) {
        newItems.push(newAr)
        newAr = []
      }
    }
    newItems.push(newAr)
    setThreeLineItems(newItems)
  }, [filteredItems])

  useEffect(() => {
    const newItems = []
    let newAr = [] 
    for (let i = 0; i < filteredItems.length; i++) {
      newAr.push(filteredItems[i])
      if (newAr.length === 2) {
        newItems.push(newAr)
        newAr = []
      }
    }
    newItems.push(newAr)
    setTwoLineItems(newItems)
  }, [filteredItems])

  useEffect(() => {
    const newItems = []
    let newAr = [] 
    for (let i = 0; i < filteredItems.length; i++) {
      newAr.push(filteredItems[i])
      if (newAr.length === 1) {
        newItems.push(newAr)
        newAr = []
      }
    }
    newItems.push(newAr)
    setOneLineItems(newItems)
  }, [filteredItems])

  const threeItemsDisplay = width > 1000 ? threeLineItems.map(item => (
    <div className='block'>
      {item.map(itemNew => 
      <>
        <ItemStore item={itemNew} displayImages={displayImages}/>
      </>
      )}
    </div>
  )) 
  : width > 600 ?
    twoLineItems.map(item => (
      <div className='block'>
        {item.map(itemNew => 
        <>
          <ItemStore item={itemNew} displayImages={displayImages}/>
        </>
        )}
      </div>
    ))
  : 
  oneLineItems.map(item => (
    <div className='block'>
      {item.map(itemNew => 
      <>
       <ItemStore item={itemNew} displayImages={displayImages}/>
      </>
      )}
    </div>
  ))

  return (
    <div className='delete-store'>
        <div className='filter'>
          <input 
            name='filter'
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            id="filter"
            onFocus={() => setFilterFocus(true)}
            onBlur={() => setFilterFocus(false)}
          />
          <motion.label animate={((filterInput && filter !== -1) || filterFocus) ? {y: -30, x: -15, fontSize: "16px", color: "rgb(0, 0, 0)"} : {}} transition={{color: {stiffness: 100}}} className={`text-label`} htmlFor={`filter`}>{t("Filter")}</motion.label>
          
        </div>
        <motion.div initial={{y: -60}} animate={{y: filter ? 0 : -60}} transition={{type: "keyframes", ease: "linear", duration: .2}} className='filter-wrapper'>
          <motion.div className='filter column'>
            <svg onClick={() => setAppliedFilters({stock: [], type: [], vendor: []})} className='bin' fill='currentColor' clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z" fill-rule="nonzero"/></svg>
            <div onClick={(e) => {e.stopPropagation();setStockFilter(prev => !prev);setTypeFilter(false);setVendorFilter(false);setOrderFilter(false)}} className='filter-item'>
              <p>{t("Stock")}</p>
              <svg className={`${stockFilter ? "rotated" : ""}`} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
              {
                stockFilter &&
                <div onClick={(e) => e.stopPropagation()} className='pop'>
                  <div className="checkbox">
                    <input
                      className="checkbox-pop"
                      type="checkbox" 
                      id="all"
                      checked={appliedFilters.stock.includes("all")}
                      onChange={(e) => {
                        e.target.checked ? setAppliedFilters(prev => ({...prev, stock: ["all"]})) : setAppliedFilters(prev => ({...prev, stock: prev.stock.filter(fi => fi !== "all")}))
                      }}
                    />
                    <label for="all"><span></span>All</label>
                  </div>
                  <div className="checkbox">
                    <input
                      className="checkbox-pop"
                      type="checkbox" 
                      id="inStock"
                      checked={appliedFilters.stock.includes("in stock")}
                      onChange={(e) => {
                        e.target.checked ? setAppliedFilters(prev => ({...prev, stock: ["in stock"]})) : setAppliedFilters(prev => ({...prev, stock: prev.stock.filter(fi => fi !== "in stock")}))
                      }}
                    />
                    <label for="inStock"><span></span>In stock</label>
                  </div>
                  <div className="checkbox">
                    <input 
                      className="checkbox-pop"
                      type="checkbox" 
                      id="outOfStock"
                      checked={appliedFilters.stock.includes("out of stock")}
                      onChange={(e) => {
                        e.target.checked ? setAppliedFilters(prev => ({...prev, stock: ["out of stock"]})) : setAppliedFilters(prev => ({...prev, stock: prev.stock.filter(fi => fi !== "out of stock")}))
                      }}
                    />
                    <label for="outOfStock"><span></span>Out of stock</label>
                  </div>
                </div>
              }
            </div>
            <div onClick={(e) => {e.stopPropagation();setTypeFilter(prev => !prev);setStockFilter(false);setVendorFilter(false);setOrderFilter(false)}} className='filter-item'>
              <p>{t("Type")}</p>
              <svg className={`${typeFilter ? "rotated" : ""}`} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
              {
                typeFilter &&
                <div onClick={(e) => e.stopPropagation()} className='pop'>
                  {[...new Set(items.map(it => it.type))].map(it => (
                    <div className="checkbox">
                      <input 
                        className="checkbox-pop" 
                        type="checkbox" 
                        id={it}
                        checked={appliedFilters.type.includes(it)}
                        onChange={(e) => e.target.checked ? setAppliedFilters(prev => ({...prev, type: [it]})) : setAppliedFilters(prev => ({...prev, type: prev.type.filter(fi => fi !== it)}))}
                      />
                      <label for={it}><span></span>{it}</label>
                    </div>
                  ))}
                </div>
              }
            </div>
            <div onClick={(e) => {e.stopPropagation();setVendorFilter(prev => !prev);setStockFilter(false);setTypeFilter(false);setOrderFilter(false)}} className='filter-item'>
              <p>{t("Vendor")}</p>
              <svg className={`${vendorFilter ? "rotated" : ""}`} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
              {
                vendorFilter &&
                <div onClick={(e) => e.stopPropagation()} className='pop'>
                  {[...new Set(items.map(it => it.madeBy))].map(it => (
                    <div className="checkbox">
                      <input
                        className="checkbox-pop"
                        type="checkbox" 
                        id={it}
                        checked={appliedFilters.vendor.includes(it)}
                        onChange={(e) => e.target.checked ? setAppliedFilters(prev => ({...prev, vendor: [it]})) : setAppliedFilters(prev => ({...prev, vendor: prev.vendor.filter(fi => fi !== it)}))}
                      />
                      <label for={it}><span></span>{it}</label>
                    </div>
                  ))}
                </div>
              }
            </div>
            <div onClick={(e) => {e.stopPropagation();setOrderFilter(prev => !prev);setStockFilter(false);setTypeFilter(false);setVendorFilter(false)}} className='filter-item'>
              <p>{t("Order type")}</p>
              <svg className={`${orderFilter ? "rotated" : ""}`} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
              {
                orderFilter &&
                <div onClick={(e) => e.stopPropagation()} className='pop'>
                  {[...new Set(items.map(it => it.orderType))].map(it => (
                    <div className="checkbox">
                      <input
                        className="checkbox-pop"
                        type="checkbox" 
                        id={it}
                        checked={appliedFilters.order.includes(it)}
                        onChange={(e) => e.target.checked ? setAppliedFilters(prev => ({...prev, order: [it]})) : setAppliedFilters(prev => ({...prev, order: prev.order.filter(fi => fi !== it)}))}
                      />
                      <label for={it}><span></span>{it}</label>
                    </div>
                  ))}
                </div>
              }
            </div>
          </motion.div>
        </motion.div>
        <div className='items'>
          {threeItemsDisplay}
        </div>
    </div>
  )
}


const ItemStore = ({ displayImages, item }) => {
  const navigate = useNavigate()
  const [collapse, setCollapse] = useState()
  const [confirmRemove, setComfirmRemove] = useState(false)
  const [confirmArchive, setComfirmArchive] = useState(false)

  const removeItem = (id) => {
    if (confirmRemove) {
      const res = axios.post("http://127.0.0.1:8000/api/remove_item/", {id})
      
      setTimeout(() => {
        setCollapse(true)
      }, 300)
    }
  }

  const archiveItem = (id) => {
    if (confirmArchive) {
      // const res = axios.post("http://127.0.0.1:8000/api/archive/", {id})

    // setTimeout(() => {
    //   setCollapse(true)
    // }, 300)
    }
  }

  return (
    <div className='wrapper-item'>
      <motion.div initial={{height: "auto"}} animate={{height: collapse ? 0 : "auto"}} transition={{duration: '.5'}} onClick={() => {
        if (confirmRemove || confirmArchive) {
          setComfirmRemove(false)
          setComfirmArchive(false)
        } else {
          navigate(`/items/${item.id}`)
        }
      }} className='item'>
        <img src={`http://127.0.0.1:8000${displayImages.length && displayImages.filter(image => image.item === item.id)[0].image}`}/>
        <div className='text-wrapper'>
          <div className='text'>
            <h2 className='col'>{item.collection}</h2>
            <h2 className='name'>{item.name}</h2>
          </div>
          <button onClick={(e) => {e.stopPropagation();removeItem(item.id);setComfirmRemove(true)}} className={`quick-btn1 quick-btn${confirmRemove ? " confirm" : ""}`}>REMOVE {item.id}</button>
          <button onClick={(e) => {e.stopPropagation();archiveItem(item.id);setComfirmArchive(true)}} className={`quick-btn1 quick-btn archive${confirmArchive ? " confirm" : ""}`}>ARCHIVE {item.id}</button>
        </div>
      </motion.div>
      <div className='removed'>
        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill-rule="nonzero"/></svg>
        <p>Removed</p>
      </div>
    </div>
  )
}

export default DeleteStore