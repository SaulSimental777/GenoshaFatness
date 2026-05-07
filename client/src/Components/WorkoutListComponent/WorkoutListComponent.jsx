import React, { useContext, useState, useEffect} from 'react'
import './WorkoutListComponent.css'
import Container from '../Container/Container'
import customFetch from '../../Utils/customFetch'
import { PiBarbellLight } from "react-icons/pi";

const WorkoutListComponent = () => {

    const [all_exercises, setAll_Exercise] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ recommended_exercises, setRecommended_Exercises] = useState([])
    const [name, setName ] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');
    const [showRecommended, setShowRecommended] = useState(false);
   
    //Todos los ejercicios
    

    const fetchAllWorkout = async () => {
      setIsLoading(true)
      try {

        const params = {};
        if (name) params.name = name;
        if (muscleGroup) params.muscleGroup = muscleGroup;

        const { data } = await customFetch.get('/exercises/allexercises', { params });
        setAll_Exercise(data.exercises);

      } catch (error) {
          console.log(error)
      } finally {
        setIsLoading(false); 
      }
    };
  
    useEffect(() => {
      fetchAllWorkout();
    }, []);

    const fetchRecommendedExercises = async () => {
      setIsLoading(true)
      try{
        const { data } = await customFetch.get('/exercises/recommended-exercises')
        setRecommended_Exercises(data.recommendedExercises);
        console.log(data)
      }catch(error){
        console.log(error)
      }finally {
        setIsLoading(false); 
      }
    }
    

  return (
    <div className="workout-list-background">
      <div className="workout-list-header">
        <div className="workout-list-presentation">
          <div className="workout-presentation-logo">
            <PiBarbellLight size={50} color='#0099ff'/>
          </div>
          <div className="workout-presentation-title">
                <h1>Lista de ejercicios</h1>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchAllWorkout();
          }}>

            <div className="workout-list-searchbars">
                <input type="text"
                          placeholder='Buscar por nombre'
                          value={name}
                          onChange={(e) => setName(e.target.value)} 
                />
                <input type="text"
                      placeholder='Buscar por grupo muscular'
                      value={muscleGroup}
                      onChange={(e) => setMuscleGroup(e.target.value)} 
                />
            </div>
            <div className="workout-list-button">
                <button onClick={() => {setShowRecommended(false)}} type='submit'>Buscar</button>
                <button onClick={() => {
                  fetchRecommendedExercises();
                  setShowRecommended(true);
                }}>Busqueda por Recomendación</button>
            </div>
        </form>
      </div>
      <div className="workout-list">
          {(showRecommended ? recommended_exercises : all_exercises).map((item, i) => (
          <Container
              key={i}
              id= {item._id}
              name={item.name}
              image={item.image}
              muscle={item.muscleGroup} />
          ))}
      </div>
    </div>

  )
}

export default WorkoutListComponent
