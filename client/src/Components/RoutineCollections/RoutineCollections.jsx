import React from 'react'
import './RoutineCollections.css'
import { Link } from 'react-router-dom'

const RoutineCollections = (props) => {

  const imageUrl = `http://localhost:5101/${props.image.replace("public\\uploads\\", "")}`; // Solucion temporal
  return (

    <div className="routine-collection">
        <div className="routinecollection-left">
            <img onClick={window.scrollTo(0, 0)} src={imageUrl} alt="" />
        </div>
        <div className="routinecollection-right">
            <div className="routinecollection-data">
                <h2>{props.name}</h2>
                <h3>Muscle Group: {props.muscleGroup}</h3>
                <p>{props.description}</p>
            </div>
            <div className="routinecollection-options">
                <button>EDIT</button>
                <button>REMOVE</button>
            </div>
        </div>
  </div>
  )
}

export default RoutineCollections