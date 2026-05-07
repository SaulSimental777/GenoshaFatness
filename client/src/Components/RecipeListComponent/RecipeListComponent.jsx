import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './RecipeListComponent.css'
import { IoIosCreate } from "react-icons/io";
import { PiBarbellLight } from "react-icons/pi";
import { toast } from 'react-toastify';
import customFetch from '../../Utils/customFetch';

const RecipeListComponent = () => {
    const [showPopup, setShowPopup] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [all_recipes, setAll_Recipe] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const togglePopup = () => setShowPopup(!showPopup)

    const fetchAllRecipe = async () => {
        try {
            const { data } = await customFetch.get('/recipes/allrecipes');
            setAll_Recipe(data.recipes);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllRecipe();
    }, []);

    const handleAddRecipe = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        try {
            await customFetch.post('/recipes/addrecipe', data);
            toast.success('Receta creada');
            e.target.reset()
            togglePopup()
            fetchAllRecipe()
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <div className="recipe-list">
        <div className="recipe-list-container">
            {all_recipes.map((recipes, index) => (
                <Link key={index} to={`/home/recipe/${recipes._id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <div className="recipe-list-format">
                        <div className="recipe-list-format-text">
                            <h1>{recipes.name}</h1>
                            <p>{recipes.Id}</p>
                        </div>
                        <div className="recipe-list-format-logo">
                            <PiBarbellLight size={50} color='0099ff'/>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        <div className="recipe-add" onClick={togglePopup}>
            <IoIosCreate size={75} color='0099ff'/>
        </div>
        <div className={showPopup ? 'recipe-popup show-popup' : 'recipe-popup'}>
            <div className="popup-content">
                <form onSubmit={handleAddRecipe}>
                    <div className="popup-logo">
                        <PiBarbellLight size={50} color='0099ff'/>
                    </div>
                    <div className="popup-field">
                        <p>Nombre de la receta</p>
                        <input type="text" name='name' required />
                    </div>
                    <button type='submit' disabled={isSubmitting} className="popup-accept">
                        {isSubmitting ? 'Creando receta...' : 'Crear'}
                    </button>
                </form>
                <button onClick={togglePopup} className="popup-accept">Cancelar</button>
            </div>
        </div>
    </div>
  )
}

export default RecipeListComponent
