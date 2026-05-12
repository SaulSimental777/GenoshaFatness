import React, { useState, useEffect} from 'react'
import './WorkoutDisplayComponent.css'
import customFetch from '../../Utils/customFetch'
import { useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RelatedVideosComponent from '../RelatedVideosComponent/RelatedVideosComponent'
import { PiBarbellLight } from "react-icons/pi";

const WorkoutDisplayComponent = () => {
    const {workoutId} = useParams()
    const [exercise, set_Exercise] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showList, setShowList] = useState(false)
    const [routines, setRoutines] = useState([])

    const toggleList = () => setShowList(!showList)

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const { data } = await customFetch.get(`/exercises/${workoutId}`);
                set_Exercise(data.exercise);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        };
        fetchWorkout();
    }, []);

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const { data } = await customFetch.get('/routines/allroutines');
                setRoutines(data.routines)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRoutines();
    }, []);

    if (isLoading) return <div><CircleLoader size={150} color="#0099ff" /></div>;
    if (!exercise) return <div>Ejercicio no encontrado</div>;

    const addToRoutine = async (routineId) => {
        try {
            await customFetch.post('routines/addExercise', {
                routineId: routineId,
                exerciseId: workoutId
            });
            toast.success('Ejercicio agregado a la rutina')
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    const imageUrl = `${import.meta.env.VITE_API_URL}/${exercise.image.replace("public\\uploads\\", "").replace("public/uploads/", "")}`;

    return (
        <div className="main-background">
            <div className="main-background-left">
                <div className="workout-image">
                    <img src={imageUrl} alt="workout-image" />
                </div>
                <div className="workout-name">
                    <h1>{exercise.name}</h1>
                    <button onClick={toggleList}>Agregar a una rutina</button>
                </div>
                <div className="workout-description">
                    <h3>Descripción</h3>
                    <p>{exercise.description}</p>
                </div>
                <div className="workout-musclegroup">
                    <h3>Grupo muscular</h3>
                    <div className="musclegroup-mini">
                        <p>{exercise.muscleGroup}</p>
                    </div>
                </div>
                <div className="workout-rank">
                    <h3>Dificultad</h3>
                    <div className="rank-mini">
                        <p>{exercise.difficulty}</p>
                    </div>
                </div>
            </div>
            <div className="main-backgorund-right">
                <div className="workout-video-header">
                    <h1>Videos relacionados</h1>
                    <div className="workout-video">
                        <RelatedVideosComponent exerciseName={exercise.name}/>
                    </div>
                </div>
            </div>
            <div className={showList ? "routines-list-display show-list" : "routines-list-display"}>
                {routines.map((routine, index) => (
                    <div key={index} className="routine-list-display-format">
                        <div className="routine-list-display-format-text">
                            <h1>{routine.name}</h1>
                            <p>{routine.Id}</p>
                            <PiBarbellLight size={50} color='0099ff'/>
                        </div>
                        <div className="routine-display-add-button">
                            <button onClick={() => addToRoutine(routine._id)}>AGREGAR</button>
                        </div>
                    </div>
                ))}
                <div className="routine-display-cancel-button">
                    <button onClick={toggleList}>CANCELAR</button>
                </div>
            </div>
        </div>
    )
}

export default WorkoutDisplayComponent
