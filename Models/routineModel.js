import mongoose from "mongoose";

const routineSchema = new mongoose.Schema(
    {
        Id:String,
        name:String,
        exercises:[{
            id:String,
            image: String,
            name:String,
            description:String,
            sets: {type:Number, default: 4},
            reps:{ type:Number, default: 12},
            muscleGroup: String
        }],
        createdBy: String

    }
);

export default mongoose.model('Routine', routineSchema);