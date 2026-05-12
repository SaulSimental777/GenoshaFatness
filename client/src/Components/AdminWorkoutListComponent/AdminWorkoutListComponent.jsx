import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import customFetch from '../../Utils/customFetch'
import { toast } from 'react-toastify'
import { GiMuscleUp } from "react-icons/gi"
import './AdminWorkoutListComponent.css'

const AdminWorkoutListComponent = () => {
    const [exercises, setExercises] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [name, setName] = useState('')
    const [muscleGroup, setMuscleGroup] = useState('')

    const fetchAllExercises = async () => {
        setIsLoading(true)
        try {
            const params = {}
            if (name) params.name = name
            if (muscleGroup) params.muscleGroup = muscleGroup
            const { data } = await customFetch.get('/exercises/allexercises', { params })
            setExercises(data.exercises)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAllExercises()
    }, [])

    const handleDelete = async (exerciseId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este ejercicio?')) return
        try {
            await customFetch.delete(`/exercises/${exerciseId}`)
            toast.success('Ejercicio eliminado')
            fetchAllExercises()
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    return (
        <div className="admin-workout-list-container">
            <div className="admin-workout-list-header">
                <h1>Lista de Ejercicios</h1>
                <div className="admin-workout-search">
                    <input
                        type="text"
                        placeholder='Buscar por nombre'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Buscar por grupo muscular'
                        value={muscleGroup}
                        onChange={(e) => setMuscleGroup(e.target.value)}
                    />
                    <button onClick={fetchAllExercises}>Buscar</button>
                </div>
            </div>
            {isLoading ? <p>Cargando...</p> : (
                <div className="admin-workout-list">
                    {exercises.map((exercise, index) => (
                        <div key={index} className="admin-workout-item">
                            <div className="admin-workout-item-info">
                                <GiMuscleUp size={30} color='#0099ff'/>
                                <div>
                                    <h3>{exercise.name}</h3>
                                    <p>{exercise.muscleGroup} | {exercise.difficulty}</p>
                                </div>
                            </div>
                            <div className="admin-workout-item-actions">
                                <Link to={`/home/admin/edit-workout/${exercise._id}`}>
                                    <button className="edit-btn">EDITAR</button>
                                </Link>
                                <button className="delete-btn" onClick={() => handleDelete(exercise._id)}>
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

export default AdminWorkoutListComponent
