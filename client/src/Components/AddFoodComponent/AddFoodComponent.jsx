import React, { useState } from 'react'
import './AddFoodComponent.css'
import { PiBarbellLight } from "react-icons/pi";
import customFetch from '../../Utils/customFetch';
import { toast } from 'react-toastify'

const AddFoodComponent = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(e.target)
        try {
            await customFetch.post('/food/addfood', formData);
            toast.success('Comida agregada exitosamente');
            e.target.reset()
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <form onSubmit={handleSubmit} className="admin-add-food-container" encType='multipart/form-data'>
        <div className="admin-add-food-logo">
            <PiBarbellLight size={75} color='#0099ff'/>
        </div>
        <div className="admin-add-food-data">
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Nombre</p>
                    <input type="text" name='name' />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Tamaño de la porción (g)</p>
                    <input type="number" name='portionSize' />
                </div>
            </div>
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Calorías</p>
                    <input type="number" name='calories' />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Proteínas</p>
                    <input type="number" name='protein' />
                </div>
            </div>
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Grasas</p>
                    <input type="number" name='fats' />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Carbohídratos</p>
                    <input type="number" name='carbs' step=".01" />
                </div>
            </div>
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Grasas saturadas</p>
                    <input type="number" name='saturatedFat' step=".01" />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Grasas trans</p>
                    <input type="number" name='transFat' step=".01" />
                </div>
            </div>
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Azúcares</p>
                    <input type="number" name='sugars' step=".01" />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Sodio</p>
                    <input type="number" name='sodium' step=".01" />
                </div>
            </div>
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Colesterol</p>
                    <input type="number" name='cholesterol' step=".01" />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Fibra dietética</p>
                    <input type="number" name='dietaryFiber' step=".01" />
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
                {isSubmitting ? 'Agregando Producto...' : 'AGREGAR'}
            </button>
        </div>
    </form>
  )
}

export default AddFoodComponent
