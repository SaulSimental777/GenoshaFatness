import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import customFetch from '../../Utils/customFetch'
import { toast } from 'react-toastify'
import { PiBarbellLight } from "react-icons/pi"

const EditFoodComponent = () => {
    const { foodId } = useParams()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [food, setFood] = useState(null)

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const { data } = await customFetch.get(`/food/${foodId}`)
                setFood(data.food)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFood()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(e.target)
        try {
            await customFetch.patch(`/food/${foodId}`, formData)
            toast.success('Comida actualizada!')
            navigate('/home/admin/all-food')
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!food) return <div>Cargando...</div>

    return (
        <form onSubmit={handleSubmit} className="admin-add-food-container" encType='multipart/form-data'>
            <div className="admin-add-food-logo">
                <PiBarbellLight size={75} color='#0099ff'/>
            </div>
            <div className="admin-add-food-data">
                <div className="admin-add-food-data-container">
                    <div className="admin-add-food-itemfield">
                        <p>Nombre</p>
                        <input type="text" name='name' defaultValue={food.name} />
                    </div>
                    <div className="admin-add-food-itemfield">
                        <p>Tamaño de la porcion (g)</p>
                        <input type="number" name='portionSize' defaultValue={food.portionSize} />
                    </div>
                </div>
                <div className="admin-add-food-data-container">
                    <div className="admin-add-food-itemfield">
                        <p>Calorias</p>
                        <input type="number" name='calories' defaultValue={food.calories} />
                    </div>
                    <div className="admin-add-food-itemfield">
                        <p>Proteinas</p>
                        <input type="number" name='protein' defaultValue={food.protein} />
                    </div>
                </div>
                <div className="admin-add-food-data-container">
                    <div className="admin-add-food-itemfield">
                        <p>Grasa</p>
                        <input type="number" name='fats' defaultValue={food.fats} />
                    </div>
                    <div className="admin-add-food-itemfield">
                        <p>Carbohidratos</p>
                        <input type="number" name='carbs' step=".01" defaultValue={food.carbs} />
                    </div>
                </div>
                <div className="admin-add-food-data-container">
                    <div className="admin-add-food-itemfield">
                        <p>Grasas saturadas</p>
                        <input type="number" name='saturatedFat' step=".01" defaultValue={food.saturatedFat} />
                    </div>
                    <div className="admin-add-food-itemfield">
                        <p>Grasas trans</p>
                        <input type="number" name='transFat' step=".01" defaultValue={food.transFat} />
                    </div>
                </div>
                <div className="admin-add-food-data-container">
                    <div className="admin-add-food-itemfield">
                        <p>Azucares</p>
                        <input type="number" name='sugars' step=".01" defaultValue={food.sugars} />
                    </div>
                    <div className="admin-add-food-itemfield">
                        <p>Sodio</p>
                        <input type="number" name='sodium' step=".01" defaultValue={food.sodium} />
                    </div>
                </div>
                <div className="admin-add-food-data-container">
                    <div className="admin-add-food-itemfield">
                        <p>Colesterol</p>
                        <input type="number" name='cholesterol' step=".01" defaultValue={food.cholesterol} />
                    </div>
                    <div className="admin-add-food-itemfield">
                        <p>Fibra dietetica</p>
                        <input type="number" name='dietaryFiber' step=".01" defaultValue={food.dietaryFiber} />
                    </div>
                </div>
            </div>
            <div className="admin-add-food-image">
                <label htmlFor="image">
                    <div className="area">
                        <p>Imagen</p>
                        <input type="file" name='image' id='image' accept='image/*'/>
                    </div>
                </label>
            </div>
            <div className="admin-add-food-button">
                <button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Actualizando...' : 'ACTUALIZAR'}
                </button>
            </div>
        </form>
    )
}

export default EditFoodComponent
