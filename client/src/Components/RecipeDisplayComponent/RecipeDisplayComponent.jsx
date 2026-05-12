import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './RecipeDisplayComponent.css'
import customFetch from '../../Utils/customFetch'
import { CircleLoader } from 'react-spinners'
import { PiBarbellLight } from 'react-icons/pi';
import { toast } from "react-toastify";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


const RecipeDisplayComponent = () => {

  const {recipeId} = useParams()
  const [one_recipe, setOne_Recipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [portionUpdate, setPortionUpdate] = useState(null);
  const [portionSize, setPortionSize] = useState('');



  const fetchOneRecipe = async () => {
    try {
      const { data } = await customFetch.get(`/recipes/${recipeId}`);
      setOne_Recipe(data.recipe);

    } catch (error) {
        console.log(error)
    } finally {
      setIsLoading(false); 
    }
  };


  useEffect(() => {
    fetchOneRecipe();
  }, []);

  const toggleWindow = (id) => {
    setPortionUpdate(portionUpdate === id ? null : id);
    setPortionSize('');

  };

  if (isLoading) {
      return <div><CircleLoader size={150} color="#0099ff" /></div>;
    }
  
    if (!one_recipe) {
      return <div>Receta no encontrada</div>;
    }



    const removeFood = async (foodId) => {
      try {
        const response = await customFetch.post(`recipes/removeFood/${recipeId}`, {
          foodId: foodId,
          
        });
        toast.success('Ingrediente removido')
        fetchOneRecipe()
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.msg);
        return error;
      }
    };

    const updateFood = async (foodId) => {
      try {
        await customFetch.post(`recipes/updateFood/${recipeId}`, {
          foodId,
          portion:portionSize
          
        });
        toast.success('Ingrediente Actualizado')
        fetchOneRecipe()
        toggleWindow(foodId)
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.msg);
        return error;
      }
    };

    const data = [
      {
        macro:'Protein',
        A:one_recipe.totalProtein
      },
      {
        macro:'Fat',
        A: one_recipe.totalFats
      },
      {
        macro: 'Carbs',
        A: one_recipe.totalCarbs
      }

    ];

  


    


  return (
    <div className="recipe-food-collection">
    <div className="recipe-food-collection-container">
      {one_recipe.ingredients.map((item, i) => (
            <div key={i} className="recipe-collection">
              <div className="recipecollection-right">
                  <div className="recipecollection-name">
                    <h3>{item.name}</h3>
                  </div>
                  <div className="ingredient-data">
                  <div className="ingredient-total">
                    <div className="ingredient-total-row">
                      <div className="ingredient-macro">
                        <h3>{item.calories}</h3>
                        <p>Calorías</p>
                      </div>
                      <div className="ingredient-macro">
                        <h3>{item.protein} g</h3>
                        <p>Proteína</p>
                      </div>
                    </div>
                    <div className="ingredient-total-row">
                      <div className="ingredient-macro">
                          <h3>{item.carbs} g</h3>
                          <p>Carbs</p>
                      </div>
                      <div className="ingredient-macro">
                        <h3>{item.fats} g</h3>
                        <p>Grasas</p>
                      </div>
                    </div>
                </div>
                  </div>
                  <div className={portionUpdate === item._id ? 'update-window-display show-window': 'update-window-display'}>
                      <div className="update-window-logo">
                        <PiBarbellLight size={75} color="0099ff" />
                      </div>
                      <div className="update-input">
                        <p>Tamaño de la Porción</p>
                        <input type="number" placeholder={item.portionSize} value={portionSize} onChange={(e) => setPortionSize(e.target.value)} />
                      </div>
                      <div className="update-window-buttons">
                        <button onClick={() => updateFood(item._id)}>ACTUALIZAR</button>
                        <button onClick={() => toggleWindow(item._id)}>SALIR</button></div>
                      </div>
                  <div className="recipecollection-options">
                      <button onClick={() => toggleWindow(item._id)}>PORCION</button>
                      <button onClick={() => removeFood(item._id)}>REMOVER</button>
                  </div>
              </div>
        </div>
      ))}
    </div>
    <div className="recipe-stats">
      <div className="recipe-title">
        <h3>{one_recipe.name}</h3>
      </div>
      <div className="recipe-graph">
        <ResponsiveContainer width={500} height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="85%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="macro" />
            <PolarRadiusAxis />
            <Radar name="Macros" dataKey="A" stroke="#8884d8" fill="#0099ff" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="recipe-total">
          <div className="recipe-total-row">
            <div className="recipe-macro">
              <h3>{one_recipe.totalCalories}</h3>
              <p>Calorías</p>
            </div>
            <div className="recipe-macro">
              <h3>{one_recipe.totalProtein} g</h3>
              <p>Proteína</p>
            </div>
          </div>
          <div className="recipe-total-row">
            <div className="recipe-macro">
                <h3>{one_recipe.totalCarbs} g</h3>
                <p>Carbs</p>
            </div>
            <div className="recipe-macro">
              <h3>{one_recipe.totalFats} g</h3>
              <p>Grasas</p>
            </div>
          </div>
      </div>
    </div>

  </div>
  )
}

export default RecipeDisplayComponent
