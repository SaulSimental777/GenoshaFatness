import mongoose from 'mongoose';

const dailyLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date: { type: Date, default: Date.now },
        recipeLog:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        routineLog:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Routine'
        }]

    }
);

export default mongoose.model('DailyLog', dailyLogSchema);