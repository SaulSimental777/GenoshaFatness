import { Router } from 'express'
import {
    getAllRoutines,
    addRoutine,
    getRoutine,
    deleteRoutine,
    appendExercise,
    removeExercise,
    updateRoutineExercise,
    updateRoutine,
    getRoutineExercises,
    sharedRoutine,
} from '../Controllers/routineControllers.js'
import { validateRoutineInput } from '../Middleware/validationMiddleware.js'

const router = Router()

router.get('/allroutines', getAllRoutines);
router.post('/addroutine', validateRoutineInput, addRoutine)
router
    .route('/:id')
    .get(getRoutine)
    .patch(updateRoutine)
    .delete(deleteRoutine)

router.post('/addExercise', appendExercise);
router.post('/shareRoutine', sharedRoutine)
router.get('/routine-workouts/:id', getRoutineExercises);
router.post('/removeWorkout/:routineId', removeExercise)
router.post('/updateWorkout/:routineId', updateRoutineExercise)

export default router
