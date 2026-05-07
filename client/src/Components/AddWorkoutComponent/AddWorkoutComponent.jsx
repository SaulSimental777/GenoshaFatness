import React, { useState } from 'react'
import './AddWorkoutComponent.css'
import { PiBarbellLight } from "react-icons/pi";
import customFetch from '../../Utils/customFetch';
import { toast } from 'react-toastify'
import { WORKOUT_DIFFICULTY } from '../../../../Utils/Constants';

const AddWorkoutComponent = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(e.target)
        try {
            await customFetch.post('/exercises/addexercise', formData);
            toast.success('Ejercicio agregado exitosamente');
            e.target.reset()
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <form onSubmit={handleSubmit} className="admin-add-workout-container" encType='multipart/form-data'>
        <div className="admin-add-workout-logo">
            <PiBarbellLight size={75} color='#0099ff'/>
        </div>
        <div className="admin-add-workout-data">
            <div className="admin-add-workout-data-container">
                <div className="admin-add-workout-itemfield">
                    <p>Nombre</p>
                    <input type="text" name='name' />
                </div>
                <div className="admin-add-workout-itemfield">
                    <p>Grupo Muscular</p>
                    <input type="text" name='muscleGroup' />
                </div>
            </div>
            <div className="admin-add-workout-description">
                <p>Descripción</p>
                <textarea name='description' />
            </div>
            <div className="admin-add-workout-difficulty">
                <p>Dificultad</p>
                <select name="difficulty">
                    {Object.values(WORKOUT_DIFFICULTY).map((itemValue) => (
                        <option key={itemValue} value={itemValue}>{itemValue}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className="admin-add-workout-image">
            <label htmlFor="image-workout">
                <div className="area-workout">
                    <p>Imagen</p>
                    <input type="file" name='image' id='image-workout' accept='image/*'/>
                </div>
            </label>
        </div>
        <div className="admin-add-workout-button">
            <button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Agregando Ejercicio...' : 'AGREGAR'}
            </button>
        </div>
    </form>
  )
}

export default AddWorkoutComponent
