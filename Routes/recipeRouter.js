import { Router } from 'express'
import {
    getAllRecipes,
    addRecipe,
    getRecipe,
    deleteRecipe,
    updateRecipe,
    appendFood,
    removeFood,
    updateRecipeFood,



} from '../Controllers/recipeControllers.js'
import { validateRecipeInput } from '../Middleware/validationMiddleware.js'

const router = Router()

router.get('/allrecipes', getAllRecipes);
router.post('/addrecipe', validateRecipeInput, addRecipe)
router
    .route('/:id')
    .get(getRecipe)
    .patch(updateRecipe)
    .delete(deleteRecipe)

router.post('/addIngredient', appendFood);
router.post('/updateFood/:recipeId', updateRecipeFood)
router.post('/removeFood/:recipeId', removeFood);

export default router