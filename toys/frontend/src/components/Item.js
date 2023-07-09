import React from 'react'
import { useParams } from 'react-router-dom'

const Item = ({ items }) => {
  const id = useParams().id
  const [item, setItem] = useState(items.filter(i => i.id === id)[0])
  
  return (
    <div className='item'>

    </div>
  )
}

export default Item