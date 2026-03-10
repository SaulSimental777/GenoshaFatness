import { Router } from 'express'
import {
    getAllExercises,
    addExercise,
    getExercise,
    updateExercise,
    deleteExercise,
    getRecommendedExercises
} from '../Controllers/exerciseControllers.js'
import { validateExerciseInput } from '../Middleware/validationMiddleware.js'
import { authorizePermissions, authenticateUser} from '../Middleware/authMiddleware.js'
import upload from '../Middleware/multerMiddleware.js'
import { checkImageUpload } from '../Middleware/multerMiddleware.js'

const router = Router()

router.get('/allexercises', getAllExercises)
router.get('/recommended-exercises', getRecommendedExercises)
router.post('/addexercise', upload.single('image'), checkImageUpload, validateExerciseInput, authenticateUser, authorizePermissions('admin'), addExercise)
router
    .route('/:id')
    .get(getExercise)
    .patch(upload.single('image'), validateExerciseInput, authenticateUser, authorizePermissions('admin'), updateExercise)
    .delete(authenticateUser, authorizePermissions('admin'), deleteExercise)

export default router