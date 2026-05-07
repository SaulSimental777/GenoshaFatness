import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './RoutineDisplayComponent.css'
import customFetch from '../../Utils/customFetch'
import { CircleLoader } from 'react-spinners'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PiBarbellLight } from 'react-icons/pi';


const RoutineDisplayComponent = () => {

  

    const {routineId} = useParams()
    const [one_routine, setOne_Routine] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [workoutUpdate, setWorkoutUpdate] = useState(null);
    const [setsUpdate, setSetsUpdate] = useState('');
    const [repsUpdate, setRepsUpdate] = useState('');

    const toggleWindow = (id) => {
      setWorkoutUpdate(workoutUpdate === id ? null : id);
      setSetsUpdate('');
      setRepsUpdate('')
  
    };
  

    const fetchOneRoutine = async () => {
      try {
        const { data } = await customFetch.get(`/routines/${routineId}`);
        setOne_Routine(data.routine);

      } catch (error) {
          console.log(error)
      } finally {
        setIsLoading(false); 
      }
    };

  
    useEffect(() => {
      fetchOneRoutine();
    }, []);

    if (isLoading) {
        return <div><CircleLoader size={150} color="#0099ff" /></div>;
      }
    
      if (!one_routine) {
        return <div>Routine not found</div>;
      }

      const removeWorkout= async (workoutId) => {
        try {
            await customFetch.post(`routines/removeWorkout/${routineId}`, {
            workoutId: workoutId,
            
          });
          toast.success('Ejercicio removido')
          fetchOneRoutine()
        } catch (error) {
          console.log(error)
          toast.error(error?.response?.data?.msg);
          return error;
        }
      };

      const updateWorkout = async (workoutId) => {
        try {
          await customFetch.post(`routines/updateWorkout/${routineId}`, {
            workoutId,
            sets: setsUpdate,
            reps: repsUpdate
            
          });
          toast.success('Ejercicio Actualizado')
          fetchOneRoutine()
          toggleWindow(workoutId)
        } catch (error) {
          console.log(error)
          toast.error(error?.response?.data?.msg);
          return error;
        }
      };

  


  return (

    <div className="routine-workout-collection">
      <div className="routine-workout-collection-container">
        {one_routine.exercises.map((item, i) => (
            <div key={i} className="routine-collection">
            <div className="routinecollection-left">
                <img onClick={window.scrollTo(0, 0)} src={`http://localhost:5101/${item.image.replace("public\\uploads\\", "")}`} alt="" />
            </div>
            <div className="routinecollection-right">
                <div className="routinecollection-data">
                    <h2>{item.name}</h2>
                    <h3>Muscle Group: {item.muscleGroup}</h3>
                    <p>{item.description}</p>
                    <h3>{item.sets} Sets X {item.reps} Reps</h3>
                </div>
                <div className="routinecollection-options">
                    <button onClick={() => toggleWindow(item._id)}>EDIT</button>
                    <button onClick={() => removeWorkout(item._id)}>REMOVE</button>
                </div>
            </div>
            <div className={workoutUpdate === item._id ? 'sets-window-display show-window': 'sets-window-display'}>
              <div className="sets-window-logo">
                <PiBarbellLight size={75} color="0099ff" />
              </div>
              <div className="setsreps-input">
                <div className="sets-input">
                  <p>Sets</p>
                  <input type="number" placeholder={item.sets} value={setsUpdate} onChange={(e) => setSetsUpdate(e.target.value)} />
                </div>
                <h1>X</h1>
                <div className="reps-input">
                  <p>Reps</p>
                  <input type="number" placeholder={item.reps} value={repsUpdate} onChange={(e) => setRepsUpdate(e.target.value)} />
                </div>
              </div>
              <div className="sets-window-buttons">
                <button onClick={() => updateWorkout(item._id)}>ACTUALIZAR</button>
                <button onClick={() => toggleWindow(item._id)}>SALIR</button></div>
              </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default RoutineDisplayComponent