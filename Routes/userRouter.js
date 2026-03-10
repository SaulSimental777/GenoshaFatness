import { Router } from 'express'
import {
    getCurrentUser,
    updateUser
} from '../Controllers/userControllers.js'
import { validateUpdateUserInput } from '../Middleware/validationMiddleware.js'

const router = Router()

router.get('/profile', getCurrentUser)
router.patch('/edit-profile', validateUpdateUserInput, updateUser)

export default router