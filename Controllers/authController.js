import { StatusCodes } from "http-status-codes";
import User from '../Models/userModel.js'
import { hashPassword, comparePassword } from '../Utils/passwordUtils.js'
import { UnauthenticatedError } from '../Errors/customErrors.js'
import { createJWT } from '../Utils/tokenUtils.js'

export const register = async (req, res) => {
    const isFirstAccount = await User.countDocuments() == 0
    req.body.role = isFirstAccount?'admin':'user'

    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ msg: 'user created' })


}

export const login = async (req, res) => {
    const user = await User.findOne({email:req.body.email})
    if(!user) throw new UnauthenticatedError('invalid credentials')

    const isPasswordCorrect = await comparePassword(req.body.password, user.password)
    if(!isPasswordCorrect) throw new UnauthenticatedError('invalid credentials');

    const token = createJWT({userId:user._id, role:user.role})

    res.status(StatusCodes.OK).json({ msg: 'user logged in', token })
}



export const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly:true,
        expires: new Date(Date.now()),
        secure: true,
        sameSite: 'none',
    });

    res.status(StatusCodes.OK).json({ msg: 'user logged out'})
}

export const checkLoggedUser = async (req, res) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json(false);
    }
    return res.json(true)
}
