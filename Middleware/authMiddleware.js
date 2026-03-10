import { UnauthenticatedError, UnauthorizedError } from '../Errors/customErrors.js'
import { verifyJWT } from '../Utils/tokenUtils.js'

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer '))
        throw new UnauthenticatedError('authentication invalid')

    const token = authHeader.split(' ')[1]
    try {
        const {userId, role, name} = verifyJWT(token);
        req.user = { userId, role, name };
        next();
    } catch (error){
        throw new UnauthenticatedError('authentication invalid')
    }
}

// Middleware para detectar si el usuario inicio sesion
export const fetchUser = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No User'})
    }
    try {
        const decodedToken = verifyJWT(authHeader.split(' ')[1]);
        const userRole = decodedToken.role
        if(userRole === 'admin'){
            return res.status(200).json({ message: 'Admin'})
        } else {
            return res.status(200).json({message: 'User'})
        }
    } catch(error){
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

export const authorizePermissions = (...roles) => {
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError('unauthorized to access this route')
        }
        next();
    }
}
