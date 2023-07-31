import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DeleteStore from './DeleteStore';
import DeleteReview from './DeleteReview';
import AddItem from './AddItem';

const CAP = ({ items, displayImages, reviews, block, setBlock }) => {

  return (
    <div className='CAP'>
      <div className='navigation'>
        <div className='block'>
          <a onClick={() => setBlock("Add")} className={`${block === "Add" ? "current" : ""}`}>Add</a>
        </div>
        <div className='block'>
          <a onClick={() => setBlock("Delete item")} className={`${block === "Delete item" ? "current" : ""}`}>Delete item</a>
        </div>
        <div className='block'>
          <a onClick={() => setBlock("Delete review")} className={`${block === "Delete review" ? "current" : ""}`}>Delete review</a>
        </div>
      </div>

      <div className='panel'>
        
        {
          block ===  "Add" ?
            <AddItem/>
          : block === "Delete item" ?
            <DeleteStore items={items} displayImages={displayImages}/>
          
          : block === "Delete review" && 
            <DeleteReview reviews={reviews}/>
        }
        
      </div>
      <ToastContainer/>
    </div>
  )
}


export default CAP