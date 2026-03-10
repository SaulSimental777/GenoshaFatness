import { Router } from 'express'

import {
    getChatResponse
} from '../Controllers/virtualInstructorController.js'


const router = Router()
router.post('/virtualInstructorChat', getChatResponse)

export default router