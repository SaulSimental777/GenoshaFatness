import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import customFetch from '../../Utils/customFetch'
import { toast } from 'react-toastify'
import { IoFastFood } from "react-icons/io5"
import './AdminFoodListComponent.css'

const AdminFoodListComponent = () => {
    const [foods, setFoods] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [name, setName] = useState('')

    const fetchAllFood = async () => {
        setIsLoading(true)
        try {
            const params = {}
            if (name) params.name = name
            const { data } = await customFetch.get('/food/allfood', { params })
            setFoods(data.foods)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAllFood()
    }, [])

    const handleDelete = async (foodId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta comida?')) return
        try {
            await customFetch.delete(`/food/${foodId}`)
            toast.success('Comida eliminada')
            fetchAllFood()
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    return (
        <div className="admin-food-list-container">
            <div className="admin-food-list-header">
                <h1>Lista de Comidas</h1>
                <div className="admin-food-search">
                    <input
                        type="text"
                        placeholder='Buscar alimentos'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={fetchAllFood}>Buscar</button>
                </div>
            </div>
            {isLoading ? <p>Cargando...</p> : (
                <div className="admin-food-list">
                    {foods.map((food, index) => (
                        <div key={index} className="admin-food-item">
                            <div className="admin-food-item-info">
                                <IoFastFood size={30} color='#0099ff'/>
                                <div>
                                    <h3>{food.name}</h3>
                                    <p>{food.calories} kcal | {food.portionSize}g porción</p>
                                </div>
                            </div>
                            <div className="admin-food-item-actions">
                                <Link to={`/home/admin/edit-food/${food._id}`}>
                                    <button className="edit-btn">EDITAR</button>
                                </Link>
                                <button className="delete-btn" onClick={() => handleDelete(food._id)}>
                                    ELIMINAR
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminFoodListComponent
