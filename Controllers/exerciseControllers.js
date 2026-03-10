import Exercise from '../Models/exerciseModel.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

export const getAllExercises = async (req, res) =>{
    const { name, muscleGroup } = req.query;
    let filtro = {};

    if (name) {
        filtro.name = { $regex: name, $options: "i"};
    }

    if(muscleGroup){
        filtro.muscleGroup = { $regex: muscleGroup, $options: "i"};
    }
    const exercises = await Exercise.find(filtro);
    res.status(StatusCodes.OK).json({exercises})
}

export const addExercise = async (req, res) => {
    const exercise = await Exercise.create(req.body);
    res.status(StatusCodes.CREATED).json({ exercise })
}

export const getRecommendedExercises = async (req, res) => {
    try{
        const { token } = req.cookies;

        if(!token){
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication token missing'});

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.userId
        const user = await User.findById(userId)

        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found'})
        }

        const allExercises = await Exercise.find();

        const rules = {
            "Gain muscle-Extremely inactive": ["press", "curl", "remo", "extension", "peso muerto", 'crunch'],
            "Gain muscle-Sedentary": ["press", "curl", "remo", "extension", "peso muerto", 'crunch',],
            "Gain muscle-Moderately active": ["press", "sentadilla", "dominadas", "hip thrust", "zancada", "fondos", "snatch"],
            "Gain muscle-Vigorously active": ["press", "sentadilla", "dominadas", "hip thrust", "zancada", "fondos", "snatch",],
            "Gain muscle-Extremely active": ["levantamiento olimpico", "snatch", "clean and jerk", "pull-up", "press militar", "remo con barra"],
    
            "Lose weight-Extremely inactive": ["cardio", "salto", "step", "bicicleta", "plancha", "eliptica", "marcha", "trote"],
            "Lose weight-Sedentary": ["cardio", "salto", "step", "bicicleta", "plancha", "eliptica", "marcha", "trote"],
            "Lose weight-Moderately active": ["burpee", "sprint", "Jumping jack", "HIIT", "cuerda", "boxeo"],
            "Lose weight-Vigorously active": ["burpee", "sprint", "Jumping jack", "HIIT", "cuerda", "boxeo"],
            "Lose weight-Extremely active": ["crossfit", "cuerda pesada", "escalada", "battle ropes", "Intervalo", "sprint en cuestas"],
      
            "Maintain weight-Extremely inactive": ["flexion", "abdominales", "zancadas", "bicicleta", "puente", "escalador", "estiramiento", "bird dog"],
            "Maintain weight-MODERATE_ACTIVE": ["flexion", "abdominales", "zancadas", "bicicleta", "puente", "escalador", "estiramiento", "bird dog"],
            "Maintain weight-VERY_ACTIVE": ["flexion", "abdominales", "zancadas", "bicicleta", "puente", "escalador", "estiramiento", "bird dog"],
            "Maintain weight-Extremely active":["flexion", "abdominales", "zancadas", "bicicleta", "puente", "escalador", "estiramiento", "bird dog"]
          };


          const key = `${user.goal}-${user.pal}`;
          const keywords = rules[key] || [];
          console.log(keywords)

          const recommendedExercises = allExercises.filter(exercise =>
            keywords.some(keyword =>
                exercise.name.toLowerCase().includes(keyword.toLowerCase())
            )
          );

          res.status(StatusCodes.OK).json({recommendedExercises})
          console.log(recommendedExercises)

    }catch(error){

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error al obtener las recomendaciones'})

    }
}

export const getExercise = async (req, res) => {
    const exercise = await Exercise.findById(req.params.id)
    res.status(StatusCodes.OK).json({exercise})
}

export const updateExercise = async (req, res) => {
    const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })

    res.status(StatusCodes.OK).json({ msg: 'exercise modified: ', exercise: updatedExercise})
}

export const deleteExercise = async (req, res) => {
    const removedExercise = await Exercise.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({ msg: 'exercise deleted', exercise: removedExercise})
}