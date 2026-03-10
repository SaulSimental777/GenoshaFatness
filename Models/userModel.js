import mongoose from "mongoose";
import { GOAL_CATEGORY, GENDER_CATEGORY, PAL_CATEGORY } from "../Utils/Constants.js";

const userSchema = new mongoose.Schema(
    {
        name:String,
        lastName:String,
        email:String,
        password:String,
        birthDate: Date,
        weight:Number,
        height:Number,
        gender:{
            type:String,
            enum: Object.values(GENDER_CATEGORY),
            default: GENDER_CATEGORY.MALE

        },
        goal: {
            type:String,
            enum:Object.values(GOAL_CATEGORY),
            default: GOAL_CATEGORY.LOSE
        },
        pal: {
            type:String,
            enum:Object.values(PAL_CATEGORY),
            default: PAL_CATEGORY.EX_INACTIVE
        },
        routines:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Routine'
        }],
        recipes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        role:{
            type:String,
            enum:['user', 'admin'],
            default:'user',
        }


    }
)

userSchema.methods.toJSON = function(){
    let obj = this.toObject()
    delete obj.password
    return obj;
}

export default mongoose.model('User', userSchema);