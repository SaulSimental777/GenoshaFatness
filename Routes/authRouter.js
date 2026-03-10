import { Router } from 'express';
import { checkLoggedUser, login, logout, register } from '../Controllers/authController.js';
import { validateLoginInput, validateRegisterInput } from '../Middleware/validationMiddleware.js';
import { fetchUser } from '../Middleware/authMiddleware.js';

const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);
router.get('/fetchUser', fetchUser)
router.get('/checkUser', checkLoggedUser)

export default router
