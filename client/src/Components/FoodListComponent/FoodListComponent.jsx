import React, { useEffect, useState} from 'react'
import './FoodListComponent.css'
import customFetch from '../../Utils/customFetch'
import FoodContainer from '../FoodContainer/FoodContainer';
import { PiBarbellLight } from "react-icons/pi";

const FoodListComponent = () => {

    const [all_food, setAll_Food] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [name, setName ] = useState('');

   
    //Todos los ejercicios

    const fetchAllFood = async () => {
      setIsLoading(true)
      try {

        const params = {};
        if (name) params.name = name;
        const { data } = await customFetch.get('/food/allfood', { params });
        setAll_Food(data.foods);
      } catch (error) {
          console.log(error)
      } finally {
        setIsLoading(false); 
      }
    };
  
    useEffect(() => {
      fetchAllFood();
    }, []);

  return (
    <div className="food-list-background">
      <div className="food-list-header">
        <div className="food-list-presentation">
          <div className="food-list-presentation-logo">
              <PiBarbellLight size={50} color='#0099ff'/>
          </div>
          <div className="food-list-presentation-title">
              <h1>Lista de alimentos</h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchAllFood();
            }}>
  
              <div className="food-list-searchbars">
                  <input type="text"
                            placeholder='Buscar alimentos'
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                  />
              </div>
              <div className="food-list-button">
                  <button type='submit'>Buscar</button>
              </div>
          </form>
        </div>
      </div>
        <div className="food-list">
            {all_food.map((item, i) => (
            <FoodContainer
                key={i}
                id= {item._id}
                name={item.name}
                image={item.image}
                portion={item.portionSize} />
            ))}
        </div>
    </div>

  )
}

export default FoodListComponent
