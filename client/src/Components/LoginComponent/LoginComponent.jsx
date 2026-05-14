import React, { useState } from 'react'
import './LoginComponent.css'
import { Link, useNavigate } from 'react-router-dom'
import customFetch from '../../Utils/customFetch';
import { toast } from "react-toastify";
import { PiBarbellLight } from "react-icons/pi";

const LoginComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await customFetch.get('/auth/checkUser')
        if(response.data === true) {
          toast.success('Welcome Back!')
          navigate('/home')
        }
      } catch (error) {
        // Token expired or invalid — clear it
        localStorage.removeItem('token')
      }
    }
    checkUser()
  }, [])

  const handleClick = async () => {
    setIsSubmitting(true)
    const email = document.querySelector('input[name="email"]').value
    const password = document.querySelector('input[name="password"]').value

    if(!email || !password) {
      toast.error('Por favor rellena todos los campos')
      setIsSubmitting(false)
      return
    }

    const data = { email, password }
    try {
        const response = await customFetch.post('/auth/login', data)
        localStorage.setItem('token', response.data.token)
        toast.success('Login Correcto')
        navigate('/home')
    } catch (error) {
        toast.error(error?.response?.data?.msg)
    } finally {
        setIsSubmitting(false)
    }
  }

  return (
    <div className="login-container">
        <div className="form-header">
            <PiBarbellLight size={75} color='#0099ff'/>
            <h1>Login</h1>
        </div>
        <div className="login-fields">
            <div className="login-containers">
                <p>Email</p>
                <input name='email' type="email" placeholder='Email' />
            </div>
        </div>
        <div className="login-fields">
            <div className="login-containers">
                <p>Contraseña</p>
                <input name='password' type="password" placeholder='Password' />
            </div>
        </div>
        <button type='button' onClick={handleClick} disabled={isSubmitting}>
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
        <p className="signup-login">¿No tienes una cuenta? <Link to='/register'>Regístrate aquí</Link></p>
    </div>
  )
}

export default LoginComponent
