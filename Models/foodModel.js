import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name:String,
        calories:Number,
        protein:Number,
        carbs:Number,
        fats:Number,
        saturatedFat: Number,
        transFat: Number,
        portionSize:Number,
        image:String,
        sugars: Number,
        sodium: Number,
        cholesterol: Number,
        dietaryFiber: Number,
    }


);

export default mongoose.model('Food', foodSchema);