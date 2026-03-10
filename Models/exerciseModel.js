import mongoose from 'mongoose';
import { WORKOUT_DIFFICULTY } from '../Utils/Constants.js';


const exerciseSchema = new mongoose.Schema(
    {
        name:String,
        muscleGroup:String,
        image:String,
        description:String,
        difficulty: {
            type: String,
            enum: Object.values(WORKOUT_DIFFICULTY),
            default: WORKOUT_DIFFICULTY.FACIL
        }
    }
);

export default mongoose.model('Exercise', exerciseSchema);