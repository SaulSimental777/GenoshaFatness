import React, { useState } from 'react'
import './RegisterComponent.css'
import { Link, useNavigate } from 'react-router-dom'
import customFetch from '../../Utils/customFetch'
import { toast } from 'react-toastify'
import { PiBarbellLight } from "react-icons/pi";
import { GENDER_CATEGORY, PAL_CATEGORY } from '../../../../Utils/Constants'
import { GOAL_CATEGORY } from '../../../../Utils/Constants'

const RegisterComponent = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        try {
            await customFetch.post('/auth/register', data)
            toast.success('Registration Successful')
            navigate('/login')
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
        <form onSubmit={handleSubmit} className='form-container'>
            <div className="form-header">
                <PiBarbellLight size={75} color='#0099ff'/>
                <h1>Registrate</h1>
            </div>
            <div className="signup-fields">
                    <div className="signup-containers">
                        <p>Nombre</p>
                        <input name='name' type="text" required />
                    </div>
                    <div className="signup-containers">
                        <p>Apellido</p>
                        <input name='lastName' type="text" required />
                    </div>
            </div>
            <div className="signup-fields">
                <div className="signup-containers">
                    <p>Email</p>
                    <input name='email' type="email" required />
                </div>
                <div className="signup-containers">
                    <p>Contraseña</p>
                    <input name='password' type="password" required />
                </div>
            </div>
            <div className="signup-fields">
                <div className="signup-containers">
                    <p>Fecha de nacimiento</p>
                    <input name='birthDate' type="date" required />
                </div>
                <div className="signup-containers">
                    <p>Genero</p>
                    <select name="gender">
                        {Object.values(GENDER_CATEGORY).map((itemValue) => (
                            <option key={itemValue} value={itemValue}>{itemValue}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="signup-fields">
                <div className="signup-containers">
                    <p>Peso</p>
                    <input name='weight' type="number" placeholder='Kilogramos' required />
                </div>
                <div className="signup-containers">
                    <p>Altura</p>
                    <input name='height' type="number" placeholder='Centimetros' required />
                </div>
            </div>
            <div className="signup-large-field">
                <div className="signup-containers">
                    <p>Objetivo</p>
                    <select name="goal">
                        {Object.values(GOAL_CATEGORY).map((itemValue) => (
                            <option key={itemValue} value={itemValue}>{itemValue}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="signup-large-field">
                <div className="signup-containers">
                    <p>Nivel de actividad fisica</p>
                    <select name="pal">
                        {Object.values(PAL_CATEGORY).map((itemValue) => (
                            <option key={itemValue} value={itemValue}>{itemValue}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </button>
            <p className="signup-login">Ya tienes una cuenta? <Link to='/login'>Inicia sesion aqui</Link></p>
        </form>
  )
}

export default RegisterComponent
