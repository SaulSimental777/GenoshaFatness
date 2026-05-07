import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import customFetch from '../../Utils/customFetch'
import { toast } from 'react-toastify'
import { PiBarbellLight } from "react-icons/pi"
import { WORKOUT_DIFFICULTY } from '../../../../Utils/Constants'

const EditWorkoutComponent = () => {
    const { workoutId } = useParams()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [exercise, setExercise] = useState(null)

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const { data } = await customFetch.get(`/exercises/${workoutId}`)
                setExercise(data.exercise)
            } catch (error) {
                console.log(error)
            }
        }
        fetchExercise()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        try {
            await customFetch.patch(`/exercises/${workoutId}`, data)
            toast.success('Exercise updated!')
            navigate('/home/admin/all-workout')
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!exercise) return <div>Cargando...</div>

    return (
        <form onSubmit={handleSubmit} className="admin-add-workout-container">
            <div className="admin-add-workout-logo">
                <PiBarbellLight size={75} color='#0099ff'/>
            </div>
            <div className="admin-add-workout-data">
                <div className="admin-add-workout-data-container">
                    <div className="admin-add-workout-itemfield">
                        <p>Name</p>
                        <input type="text" name='name' defaultValue={exercise.name} />
                    </div>
                    <div className="admin-add-workout-itemfield">
                        <p>Muscle Group</p>
                        <input type="text" name='muscleGroup' defaultValue={exercise.muscleGroup} />
                    </div>
                </div>
                <div className="admin-add-workout-description">
                    <p>Description</p>
                    <textarea name='description' defaultValue={exercise.description} />
                </div>
                <div className="admin-add-workout-difficulty">
                    <p>Dificultad</p>
                    <select name="difficulty" defaultValue={exercise.difficulty}>
                        {Object.values(WORKOUT_DIFFICULTY).map((itemValue) => (
                            <option key={itemValue} value={itemValue}>{itemValue}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="admin-add-workout-button">
                <button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Actualizando...' : 'ACTUALIZAR'}
                </button>
            </div>
        </form>
    )
}

export default EditWorkoutComponent
