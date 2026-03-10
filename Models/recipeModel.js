import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        Id:String,
        name:String,
        ingredients:[{

            id: String,
            name: String,
            portionSize: Number,
            calories:Number,
            protein: Number,
            carbs: Number,
            fats: Number,
            basePortion: Number,
            baseCalories: Number,
            baseProtein: Number,
            baseFats: Number,
            baseCarbs: Number
            
        }],
        description:String,
        createdBy: String,
        totalCalories:{ type: Number, default: 0 },
        totalProtein:{ type: Number, default: 0 },
        totalCarbs:{ type: Number, default: 0 },
        totalFats:{ type: Number, default: 0 },
    }
);

export default mongoose.model('Recipe', recipeSchema);