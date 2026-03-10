import { Router } from 'express'
import {
    createDailyLog,
    appendRoutine,
    appendRecipe,
    removeMeal,
    removeRoutine
}
from '../Controllers/dailyLogControllers.js'


const router = Router()
router.get('/addDailyLog', createDailyLog)
router.post('/addRoutineLog', appendRoutine)
router.post('/addRecipeLog', appendRecipe)
router.post('/removeMeal', removeMeal)
router.post('/removeRoutine', removeRoutine)





export default router