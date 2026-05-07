import React from 'react'
import './FoodContainer.css'
import { Link } from 'react-router-dom'
import { PiBarbellLight } from "react-icons/pi";

const FoodContainer = (props) => {

  return (
    <Link to={`/home/food/${props.id}`}  style={{textDecoration: 'none', color: 'black'}}>
    <div className="food-container">
        <div className="food-container-top">
        </div>
        <div className="food-container-bottom">
            <h1>{props.name}</h1>
            <h3>{props.portion} g</h3>
        </div>
        <div className="food-container-corner">
            <PiBarbellLight size={50} color='#0099ff'/>
        </div>
    </div>
</Link>
  )
}

export default FoodContainer