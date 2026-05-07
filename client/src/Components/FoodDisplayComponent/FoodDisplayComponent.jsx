import React, {useState, useEffect} from 'react'
import './FoodDisplayComponent.css'
import customFetch from '../../Utils/customFetch'
import { useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners'
import { PiBarbellLight } from "react-icons/pi";
import { toast } from 'react-toastify';
import { SlEnergy } from "react-icons/sl";
import { LiaDumbbellSolid } from "react-icons/lia";
import { FiDroplet } from "react-icons/fi";
import { LuDumbbell, LuWheat } from "react-icons/lu";
import { LuDroplets } from "react-icons/lu";
import { TbSalt } from "react-icons/tb";
import { TbCandy } from "react-icons/tb";
import { RiErrorWarningLine } from "react-icons/ri";
import { CiWheat } from "react-icons/ci";

const FoodDisplayComponent = () => {
    const {foodId} = useParams()
    const [food, set_Food] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showList, setShowList] = useState(false)
    const [recipes, setRecipes] = useState([])

    const toggleList = () => setShowList(!showList)

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const { data } = await customFetch.get(`/food/${foodId}`);
                set_Food(data.food);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        };
        fetchFood();
    }, []);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const { data } = await customFetch.get('/recipes/allrecipes');
                setRecipes(data.recipes)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRecipes();
    }, []);

    if (isLoading) return <div><CircleLoader size={150} color="#0099ff" /></div>;
    if (!food) return <div>Comida no encontrada</div>;

    const addToRecipe = async (recipeId) => {
        try {
            await customFetch.post('recipes/addIngredient', {
                recipeId: recipeId,
                foodId: foodId
            });
            toast.success('Ingrediente agregado')
            toggleList()
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    const imageUrl = `${import.meta.env.VITE_API_URL}/${food.image.replace("public\\uploads\\", "").replace("public/uploads/", "")}`;

    return (
        <div className="food-display-container">
            <div className="food-display-left">
                <div className="food-display-left-top">
                    <img src={imageUrl} alt="" />
                </div>
                <div className="food-display-left-bottom">
                    <h1>{food.name}</h1>
                    <h3>Tamaño de la porción: {food.portionSize} g</h3>
                    <button onClick={toggleList}>Agregar a una receta</button>
                </div>
            </div>
            <div className="food-display-right">
                <div className="food-display-top-right">
                    <div className="nutri-facts-header">
                        <div className="barbell-icon"><PiBarbellLight size={50} color='white'/></div>
                    </div>
                    <div className="calories">
                        <SlEnergy/>
                        <h2>{food.calories}</h2>
                        <p>Calorias</p>
                    </div>
                    <div className="macros">
                        <div className="proteins">
                            <LuDumbbell/>
                            <h2>{food.protein}g</h2>
                            <p>Proteinas</p>
                        </div>
                        <div className="carbs">
                            <LuWheat/>
                            <h2>{food.carbs}g</h2>
                            <p>Carbohidratos</p>
                        </div>
                        <div className="fats">
                            <FiDroplet/>
                            <h2>{food.fats}g</h2>
                            <p>Grasas</p>
                        </div>
                    </div>
                </div>
                <div className="food-display-bottom-right">
                    <div className="nutri-facts-container">
                        <div className="nutri-facts-icon">
                            <div className="nutri-icon-satfat"><LuDroplets size={18}/></div>
                            <p>Grasas Saturadas</p>
                        </div>
                        <h4>{food.saturatedFat}g</h4>
                    </div>
                    <div className="nutri-facts-container">
                        <div className="nutri-facts-icon">
                            <div className="nutri-icon-tranfat"><LuDroplets size={18}/></div>
                            <p>Grasas Trans</p>
                        </div>
                        <h4>{food.transFat}g</h4>
                    </div>
                    <div className="nutri-facts-container">
                        <div className="nutri-facts-icon">
                            <div className="nutri-icon-sodium"><TbSalt size={18}/></div>
                            <p>Sodio</p>
                        </div>
                        <h4>{food.sodium}g</h4>
                    </div>
                    <div className="nutri-facts-container">
                        <div className="nutri-facts-icon">
                            <div className="nutri-icon-sugar"><TbCandy size={18}/></div>
                            <p>Azucares</p>
                        </div>
                        <h4>{food.sugars}g</h4>
                    </div>
                    <div className="nutri-facts-container">
                        <div className="nutri-facts-icon">
                            <div className="nutri-icon-chol"><RiErrorWarningLine size={18}/></div>
                            <p>Colesterol</p>
                        </div>
                        <h4>{food.cholesterol}g</h4>
                    </div>
                    <div className="nutri-facts-container">
                        <div className="nutri-facts-icon">
                            <div className="nutri-icon-fib"><CiWheat size={18}/></div>
                            <p>Fibra Dietetica</p>
                        </div>
                        <h4>{food.dietaryFiber}g</h4>
                    </div>
                </div>
                <hr />
            </div>
            <div className={showList ? "recipes-list-display show-list" : "recipes-list-display"}>
                {recipes.map((recipe, index) => (
                    <div key={index} className="recipe-list-display-format">
                        <div className="recipe-list-display-format-text">
                            <h1>{recipe.name}</h1>
                            <p>{recipe.Id}</p>
                            <PiBarbellLight size={50} color='0099ff'/>
                        </div>
                        <div className="recipe-display-add-button">
                            <button onClick={() => addToRecipe(recipe._id)}>Agregar</button>
                        </div>
                    </div>
                ))}
                <div className="recipe-display-cancel-button">
                    <button onClick={toggleList}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default FoodDisplayComponent
