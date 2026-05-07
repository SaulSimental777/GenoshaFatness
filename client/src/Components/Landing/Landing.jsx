import React from 'react'
import './Landing.css'
import { PiBarbellLight } from "react-icons/pi";
import { Link } from 'react-router-dom'
import landing_image from '../../assets/landing_image.svg'

const Landing = () => {
  return (
    <div className="landing-container">
        <div className="top-logo">
            <PiBarbellLight size={50} color='#0099ff'/>
            <h1>Genosha Fitness</h1>
        </div>
        <div className="middle-logo">
            <div className="hero-container">
                <h1>Desbloquea tu potencial con Genosha</h1>
                <p>
                    Genosha Fitness es la mejor aplicacion fitness que te ayudara
                    a alcanzar tus metas y vivir una vida mas saludable. Con funciones
                    como seguimiento de calorias y planes de ejercicio tendras las
                    herramientas que necesitas para llevar tus rutinas de ejercicio al
                    siguiente nivel.
                </p>
                <div className="btn-options">
                    <Link to='/register'><button>Registrarse</button></Link>
                    <Link to='/login'><button>Iniciar Sesion</button></Link>
                </div>
            </div>
            <div className="hero-image">
                <img src={landing_image} alt="landing_image" />
            </div>
        </div>


    </div>

    
  )
}

export default Landing