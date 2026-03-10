import { body, param, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError, UnauthorizedError } from '../Errors/customErrors.js'
import { GOAL_CATEGORY, PAL_CATEGORY } from '../Utils/Constants.js'
import { GENDER_CATEGORY } from '../Utils/Constants.js'
import User from '../Models/userModel.js'

const withValidationErrors = (validateValues) =>{
    return [validateValues, (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const errorMessages = errors.array().map((error) => error.msg);
            if(errorMessages[0].startsWith('no product')){
                throw new NotFoundError(errorMessages)
            }
            if(errorMessages[0].startsWith('not authorized')){
                throw new UnauthorizedError('not authorized to access this route')
            }
            throw new BadRequestError(errorMessages);
        }
        next();
    }]
}

export const validateRoutineInput = withValidationErrors([
    body('name').notEmpty().withMessage('Name of the routine is required')
    .isLength({max:30}).withMessage('Routine name must be less than 30 characters long'),
]);

export const validateRecipeInput = withValidationErrors([
    body('name').notEmpty().withMessage('Name of the recipe is required')
    .isLength({max:30}).withMessage('Recipe name must be less than 30 characters long'),
]);

export const validateExerciseInput = withValidationErrors([
    body('name').notEmpty().withMessage('Name of the exercise is required'),
    body('muscleGroup').notEmpty().withMessage('Muscle group is required'),
    body('image').notEmpty().withMessage('Image of the exercise is required'),
    body('description').notEmpty().withMessage('Description of the exercise is required')

]);

export const validateFoodInput = withValidationErrors([
    body('name').notEmpty().withMessage('Name of the food is required'),
    body('calories').notEmpty().withMessage('Calories per portion are required'),
    body('protein').notEmpty().withMessage('Proteins per portion are required'),
    body('carbs').notEmpty().withMessage('Carbs per portion are required'),
    body('fats').notEmpty().withMessage('Fats per portion are required'),
    body('portionSize').notEmpty().withMessage('Portion size is required'),
    body('image').notEmpty().withMessage('Image of the food is required'),
]);

export const validateRegisterInput = withValidationErrors([

    body('name').notEmpty().withMessage('Name is required')
    .isLength({max:15}).withMessage('Name must be less than 15 characters long'),
    body('lastName').notEmpty().withMessage('Last name is required')
    .isLength({max:20}).withMessage('Last name must be less than 20 characters long'),
    body('email').notEmpty().withMessage('email is required').isEmail()
    .withMessage('invalid email format').custom(async(email) => {
      const user = await User.findOne({email})
      if(user){
        throw new BadRequestError('email already exists')
      }
  
    }),
    body('password').notEmpty().withMessage('password is required')
    .isLength({min:8}).withMessage('password must be at least 8 characters long'),
    body('birthDate').notEmpty().withMessage('Birth date is required'),
    body('weight').notEmpty().withMessage('Weight is required'),
    body('height').notEmpty().withMessage('Height is required'),
    body('gender').isIn(Object.values(GENDER_CATEGORY)).withMessage('Invalid gender value'),
    body('goal').isIn(Object.values(GOAL_CATEGORY)).withMessage('Invalid goal category'),
    body('pal').isIn(Object.values(PAL_CATEGORY)).withMessage('Invalid physical activity level category'),
]);

export const validateLoginInput = withValidationErrors([
    body('email').notEmpty().withMessage('email is required').isEmail()
    .withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required')
]);

export const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail()
    .withMessage('invalid email format').custom(async(email, { req }) => {
    const user = await User.findOne({email})
    if(user && user._id.toString() !== req.user.userId){
    throw new BadRequestError('email already exists')
    }

    }),
    
])


