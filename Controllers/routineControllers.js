import { StatusCodes } from 'http-status-codes'
import Routine from '../Models/routineModel.js'
import User from '../Models/userModel.js'
import Exercise from '../Models/exerciseModel.js'
import jwt from 'jsonwebtoken'


export const getAllRoutines = async (req, res) => {
    try{

        const {token} = req.cookies; 
        
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication token missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.userId
        const user = await User.findById(userId).populate('routines');
        res.status(StatusCodes.OK).json({ routines: user.routines})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error retrieving routines', error})
        console.log(error)
    }

}

export const addRoutine = async (req, res) => {
    try{
        const {token} = req.cookies; 
        
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication token missing' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const userId = decoded.userId;
        const user = await User.findById(userId);
        const username = user.name; 
        const userLastname = user.lastName; 

        const blockOne = `${username.charAt(0)}${userLastname.charAt(0)}`;
        const blockTwo = userId.toString().slice(-4);
        const blockThree = Math.floor(Math.random() * 1000) +1;

        const uniqueId = `${blockOne}${blockTwo}-${blockThree}`


        const routine = await Routine.create({
            ...req.body,
            Id: uniqueId,
            createdBy: userId
        });
        user.routines.push(routine._id)
        await user.save()



        res.status(StatusCodes.CREATED).json({routine});



    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Unexpected error creating the routine'})
        console.log(error)
    }
}

export const getRoutine = async(req, res) => {
    const routine = await Routine.findById(req.params.id).populate('exercises')
    res.status(StatusCodes.OK).json({routine})
}

export const deleteRoutine = async(req, res) => {
    const removedRoutine = await Routine.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({ msg: 'routine deleted', routine: removedRoutine})

}

export const updateRoutine = async(req, res) => {

    const updatedRoutine = await Routine.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })

    res.status(StatusCodes.OK).json({ msg: 'routine modified: ', routine: updatedRoutine})

}

export const appendExercise = async(req, res) => {
    const {routineId, exerciseId } = req.body;

    let routine = await Routine.findById(routineId)
    let exercise = await Exercise.findById(exerciseId);
    routine.exercises.push({
        id:exercise._id,
        name: exercise.name,
        image:exercise.image,
        description: exercise.description,
        muscleGroup:exercise.muscleGroup

    })
    await routine.save();

    res.status(StatusCodes.OK).json({msg: 'exercise added succesfully'})


}

export const getRoutineExercises = async (req, res) => {
    try {

        const routine = await Routine.findById(req.params.id).populate('exercises')
        res.status(StatusCodes.OK).json({exercises: routine.exercises})
        
    } catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error retrieving exercices', error });
        
    }
}

export const removeExercise = async(req, res) => {

    const {routineId} = req.params
    const {workoutId} = req.body

    const routine = await Routine.findById(routineId)

    const workoutInRoutine = routine.exercises.find(item => item._id.toString() === workoutId);
    routine.exercises.remove(workoutInRoutine)
    await routine.save()

    res.status(StatusCodes.OK).json({ msg: 'Exercise removed succesfully'})



}

export const updateRoutineExercise = async(req, res) => {

    const {sets} = req.body
    const {reps} = req.body
    const { workoutId } = req.body
    const { routineId } = req.params

    const routine = await Routine.findById(routineId)
    const workoutInRoutine = routine.exercises.find(item => item._id.toString() === workoutId);
    
    workoutInRoutine.sets = sets
    workoutInRoutine.reps = reps
    
    await routine.save()

    res.status(StatusCodes.OK).json({ msg: 'Exercise updated succesfully'})


}

export const sharedRoutine = async(req, res) => {

    const{routineId } = req.body;

    const {token} = req.cookies; 
        
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId
    const user = await User.findById(userId);

    try{
        const routine = await Routine.findOne({Id: routineId});
        if(!routine){
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Routine not found'})
        }

        if(routine.createdBy == userId){
            return res.status(StatusCodes.CONFLICT).json({msg: 'Rutina ya creada por el usuario'})
        }

        user.routines.push(routine._id)
        await user.save();

        return res.status(StatusCodes.OK).json({msg: 'Routine Added'})

       
    }
    catch (error){
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: 'Error adding Routine'})
    }

}

