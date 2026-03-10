import { Router } from 'express'

import { getFitnessNews } from '../Controllers/fitnessNewsController.js'


const router = Router()
router.get('/fitnessNews', getFitnessNews)

export default router