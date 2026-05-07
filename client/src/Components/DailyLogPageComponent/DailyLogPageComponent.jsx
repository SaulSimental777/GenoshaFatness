import React, { useEffect, useState } from 'react';
import './DailyLogPageComponent.css';
import customFetch from '../../Utils/customFetch';
import { PiBarbellLight } from 'react-icons/pi';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/profile');
    return data;
  } catch (error) {
    console.log(error);
    return redirect('/');
  }
};

const DailyLogPageComponent = () => {
    const [dailyLogResponse, setDailyLog] = useState({
        recipeLog: [],
        routineLog: []
      });
  const [routinesResponse, setRoutinesLog] = useState([]);
  const [recipesResponse, setRecipesLog] = useState([]);
  const [showRoutines, setShowRoutines] = useState(false);
  const [showRecipes, setShowRecipes] = useState(false);
  const { user } = useLoaderData();

  const toggleListRoutines = () => {
    setShowRoutines(!showRoutines);
  };

  const toggleListRecipes = () => {
    setShowRecipes(!showRecipes);
  };

  const fetchDailyLog = async () => {
    try {
      const dailyLogResponse = await customFetch.get('/dailylog/addDailyLog');
      setDailyLog(dailyLogResponse.data.dailyLog);

      const routinesResponse = await customFetch.get('/routines/allroutines');
      setRoutinesLog(routinesResponse.data.routines);

      const recipesResponse = await customFetch.get('/recipes/allrecipes');
      setRecipesLog(recipesResponse.data.recipes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDailyLog();
  }, []);



  const addRoutine = async (routineId) => {
    try {
      const response = await customFetch.post('dailylog/addRoutineLog', {
        routineId: routineId,
        userId: user._id,
      });
      toast.success('Routine Added');
      toggleListRoutines()
      fetchDailyLog();
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  const addRecipe = async (recipeId) => {
    try {
      const response = await customFetch.post('dailylog/addRecipeLog', {
        recipeId: recipeId,
        userId: user._id,
      });
      toast.success('Recipe Added');
      fetchDailyLog();
      toggleListRecipes()
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  const removeRecipe = async (recipeId) => {
    try {
      const response = await customFetch.post('dailylog/removeMeal', {
        recipeId: recipeId,
        userId: user._id,
        
      });
      console.log(response)
      toast.success('Recipe Removed');
      fetchDailyLog();
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  const removeRoutine = async (routineId) => {
    try {
      const response = await customFetch.post('dailylog/removeRoutine', {
        routineId: routineId,
        userId: user._id,
        
      });
      console.log(response)
      toast.success('Routine Removed');
      fetchDailyLog();
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  
  // Edad del usuario
  const birthDate = new Date(user.birthDate)
  const actualDate = new Date()
  let age = actualDate.getFullYear() - birthDate.getFullYear();

  const monthDiff = actualDate.getMonth() - birthDate.getMonth();
  const dayDiff = actualDate.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  const userWeight = user.weight
  const userHeight = (user.height / 100)

    // Formula de Harris Benedict

    let Harris_TMB = 0
    let TotalHarris_TMB = 0
  if (user.gender == 'Male') {
      Harris_TMB = Math.round((88.362 + (13.397 * userWeight) + (4.799 * user.height) - (5.677 * age)))
      if (user.pal === 'Extremely inactive'){
          TotalHarris_TMB = Harris_TMB * 1.2
      }
      else if (user.pal === 'Sedentary'){
          TotalHarris_TMB = Harris_TMB * 1.375
      }
      else if( user.pal === 'Moderately active'){
          TotalHarris_TMB = Harris_TMB * 1.55
      }
      else if (user.pal === 'Vigorously active'){
          TotalHarris_TMB = Harris_TMB * 1.725
      }
      else{
          TotalHarris_TMB = Harris_TMB * 1.9
      }
  
      
  }else{
      Harris_TMB = Math.round((447.593 + (9.247 * userWeight) + (3.098 * userHeight) - (4.330 * age)))
      if (user.pal === 'Extremely inactive'){
          TotalHarris_TMB = Harris_TMB * 1.2
      }
      else if (user.pal === 'Sedentary'){
          TotalHarris_TMB = Harris_TMB * 1.375
      }
      else if( user.pal === 'Moderately active'){
          TotalHarris_TMB = Harris_TMB * 1.55
          console.log('Calorias diarias = ', TotalHarris_TMB)
      }
      else if (user.pal === 'Vigorously active'){
          TotalHarris_TMB = Harris_TMB * 1.725
      }
      else{
          TotalHarris_TMB = Harris_TMB * 1.9
      }
  }
  
  let userTotalCalories = 0
  let harrisProtein = 0
  let harrisFat = 0
  let harrisCarbs = 0
  
  if(user.Meta === 'Lose weight'){
      userTotalCalories = TotalHarris_TMB - 500
      harrisProtein = 2.2 * user.weight
      harrisFat = (0.30 * userTotalCalories) / 9
      harrisCarbs = (userTotalCalories - ((harrisProtein * 4) + (0.30 * userTotalCalories))) / 4
  
  }
  else if (user.Meta === 'Gain muscle'){
      userTotalCalories = TotalHarris_TMB + 500
      harrisProtein = 1.8 * user.weight
      harrisFat = (0.25 * userTotalCalories) / 9
      harrisCarbs = (userTotalCalories - ((harrisProtein * 4) + (0.25 * userTotalCalories))) / 4
  }
  else {
      userTotalCalories = TotalHarris_TMB
      userTotalCalories = TotalHarris_TMB + 500
      harrisProtein = 2.0 * user.weight
      harrisFat = (0.30 * userTotalCalories) / 9
      harrisCarbs = (userTotalCalories - ((harrisProtein * 4) + (0.25 * userTotalCalories))) / 4
  }

  const totalCalories = dailyLogResponse.recipeLog.reduce((total, item) => total + item.totalCalories, 0);
  const totalProtein = dailyLogResponse.recipeLog.reduce((total, item) => total + item.totalProtein, 0);
  const totalCarbs = dailyLogResponse.recipeLog.reduce((total, item) => total + item.totalCarbs, 0);
  const totalFats = dailyLogResponse.recipeLog.reduce((total, item) => total + item.totalFats, 0);



  


  const data = [
    {
      name: 'Calorías',
      Meta: Math.round(TotalHarris_TMB, 0),
      Hoy: totalCalories,

    },
    {
      name: 'Proteína',
      Meta: Math.round(harrisProtein, 0),
      Hoy: totalProtein,

    },
    {
      name: 'Carbs',
      Meta: Math.round(harrisCarbs, 0),
      Hoy: totalCarbs,
   
    },
    {
      name: 'Grasas',
      Meta: Math.round(harrisFat, 0),
      Hoy: totalFats,
    },
    
  ];


  

  return (
    <div className="dailylog-container">
      <div className="dailylog-data">
        <div className="dailylog-meals">
          <h3>Comidas de hoy</h3>
          <div className="dailylog-recipelist">
            {
              dailyLogResponse.recipeLog.map((item, index) => (
                <div key={index} className="dailylog-list-display-format">
                  <div className="dailylog-list-display-format-text">
                    <h2>{item.name}</h2>
                    <div className="dailylog-listbuttonlogo">
                      <PiBarbellLight size={50} color="0099ff" />
                      <button onClick={() => removeRecipe(item._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))

            }
          </div>
          <button onClick={toggleListRecipes}>Agregar Receta</button>
        </div>
        <div className="dailylog-routines">
          <h3>Rutinas de hoy</h3>
            <div className="dailylog-routinelist">
                {
                dailyLogResponse.routineLog.map((item, index) => (
                    <div key={index} className="dailylog-list-display-format">
                    <div className="dailylog-list-display-format-text">
                        <h2>{item.name}</h2>
                        <div className="dailylog-listbuttonlogo">
                          <PiBarbellLight size={50} color="0099ff" />
                          <button onClick={() => removeRoutine(item._id)}>Remove</button>
                        </div>
                    </div>
                    </div>
                ))
                
                }
            </div>
          <button onClick={toggleListRoutines}>Agregar Rutina</button>
        </div>
      </div>
      <div className="dailylog-chart">
        <h3>Macros Diarios</h3>
        <div className="dailylog-responsivechart">
          <ResponsiveContainer height={650}>
                <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Hoy" stackId="a" fill="#0099ff" />
                <Bar dataKey="Meta" stackId="a" fill="#7e7e7e" />
                </BarChart>
              </ResponsiveContainer>
        </div>
      </div>
      <div className={showRoutines ? 'routines-list-display show-list' : 'routines-list-display'}>
        {routinesResponse?.length > 0 ? (
          routinesResponse.map((routine, index) => (
            <div key={index} className="routine-list-display-format">
              <div className="routine-list-display-format-text">
                <h1>{routine.name}</h1>
                <p>{routine.Id}</p>
                <PiBarbellLight size={50} color="0099ff" />
              </div>
              <div className="routine-display-add-button">
                <button onClick={() => addRoutine(routine._id)}>ADD</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay rutinas disponibles</p>
        )}
        <div className="routine-display-cancel-button">
          <button onClick={toggleListRoutines}>CANCEL</button>
        </div>
      </div>
      <div className={showRecipes ? 'routines-list-display show-list' : 'routines-list-display'}>
        {recipesResponse?.length > 0 ? (
          recipesResponse.map((recipe, index) => (
            <div key={index} className="routine-list-display-format">
              <div className="routine-list-display-format-text">
                <h1>{recipe.name}</h1>
                <p>{recipe.Id}</p>
                <PiBarbellLight size={50} color="0099ff" />
              </div>
              <div className="routine-display-add-button">
                <button onClick={() => addRecipe(recipe._id)}>ADD</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay recetas disponibles</p>
        )}
        <div className="routine-display-cancel-button">
          <button onClick={toggleListRecipes}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default DailyLogPageComponent;
