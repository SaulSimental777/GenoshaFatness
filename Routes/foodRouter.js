import { Router } from 'express'
import {
    getAllFood,
    addFood,
    getFood,
    updateFood,
    deleteFood
} from '../Controllers/foodControllers.js'
import { validateFoodInput } from '../Middleware/validationMiddleware.js'
import { authorizePermissions, authenticateUser} from '../Middleware/authMiddleware.js'
import upload from '../Middleware/multerMiddleware.js'
import { checkImageUpload } from '../Middleware/multerMiddleware.js'

const router = Router()

router.get('/allfood', getAllFood)
router.post('/addfood', upload.single('image'), checkImageUpload, validateFoodInput, authenticateUser, authorizePermissions('admin'), addFood)
router
    .route('/:id')
    .get(getFood)
    .patch(upload.single('image'), validateFoodInput, authenticateUser, authorizePermissions('admin'), updateFood)
    .delete(authenticateUser, authorizePermissions('admin'), deleteFood)

export default router