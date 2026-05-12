import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import customFetch from '../../Utils/customFetch'
import './UserSettingsComponent.css'
import { GOAL_CATEGORY, PAL_CATEGORY } from '../../../../Utils/Constants'
import { toast } from 'react-toastify'

const UserSettingsComponent = () => {
    const [user, setUser] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const fetchUserInfo = async () => {
        try {
            const { data } = await customFetch.get('/users/profile');
            setUser(data.user)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUserInfo()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        try {
            await customFetch.patch('/users/edit-profile', data)
            toast.success('Informacion actualizada')
            navigate('/home')
        } catch(error) {
            toast.error(error?.response?.data?.msg)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        toast.success('Sesion cerrada')
        navigate('/')
    }

    return (
        <div className="user-settings-background">
            <div className="user-settings-top">
                <h1>Información Personal</h1>
                <p>Aquí puedes actualizar la información de tu perfil</p>
            </div>
            <div className="user-settings-bottom">
                <form onSubmit={handleSubmit}>
                    <div className="first-row">
                        <div className="input-row">
                            <h4>Nombre</h4>
                            <input type="text" name='name' defaultValue={user.name} />
                        </div>
                        <div className="input-row">
                            <h4>Apellido</h4>
                            <input type="text" name='lastName' defaultValue={user.lastName} />
                        </div>
                        <div className="input-row">
                            <h4>Email</h4>
                            <input type="email" name='email' defaultValue={user.email} />
                        </div>
                    </div>
                    <div className="second-row">
                        <div className="input-row">
                            <h4>Altura (cm)</h4>
                            <input type="number" name='height' defaultValue={user.height} />
                        </div>
                        <div className="input-row">
                            <h4>Peso (kg)</h4>
                            <input type="number" name='weight' defaultValue={user.weight} />
                        </div>
                    </div>
                    <div className="third-row">
                        <div className="select-row">
                            <h4>Tu objetivo actual es: <div className="marker">{user.goal}</div></h4>
                            <select name="goal">
                                {Object.values(GOAL_CATEGORY).map((itemValue) => (
                                    <option key={itemValue} value={itemValue}>{itemValue}</option>
                                ))}
                            </select>
                        </div>
                        <div className="select-row">
                            <h4>Tu nivel de actividad física actual es: <div className="marker">{user.pal}</div></h4>
                            <select name="pal">
                                {Object.values(PAL_CATEGORY).map((itemValue) => (
                                    <option key={itemValue} value={itemValue}>{itemValue}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="button-row">
                        <button type='submit' disabled={isSubmitting}>
                            {isSubmitting ? 'Actualizando...' : 'ACTUALIZAR'}
                        </button>
                    </div>
                </form>
                <div className="button-row">
                    <button className="logout-btn" onClick={handleLogout}>
                        CERRAR SESION
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserSettingsComponent
