import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import 'express-async-errors';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'capacitor://localhost', 'http://localhost'],
  credentials: true,
}));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const port = process.env.PORT || 5101

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server running on PORT ${port}...`);
    });
} catch (error){
    console.log(error);
    process.exit(1);
}

app.use(cookieParser());
app.use(express.json());

// routers

import routineRouter from './Routes/routineRouter.js'
import recipeRouter from './Routes/recipeRouter.js'
import foodRouter from './Routes/foodRouter.js'
import exerciseRouter from './Routes/exerciseRouter.js'
import userRouter from './Routes/userRouter.js'
import authRouter from './Routes/authRouter.js'
import dailyLogRouter from './Routes/dailyLogRouter.js'
import virtualInstructorRouter from './Routes/virtualInstructorRouter.js'
import videoReferenceRouter from './Routes/videoReferenceRouter.js'
import fitnessNewsRouter from './Routes/fitnessNewsRouter.js'


// middleware

import errorHandlerMiddleware from './Middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './Middleware/authMiddleware.js';


//public

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./public/uploads")));

// Routes

app.use('/api/v1/routines', routineRouter);
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/exercises', exerciseRouter);
app.use('/api/v1/food', foodRouter);
app.use('/api/v1/users', authenticateUser,userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/dailylog', dailyLogRouter)
app.use('/api/v1/virtualInstructor', virtualInstructorRouter)
app.use('/api/v1/videos', videoReferenceRouter)
app.use('/api/v1/news', fitnessNewsRouter)

// NOT FOUND 
app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' })
})

app.use(errorHandlerMiddleware);

// INTERNAL SERVER ERROR

app.use((err, req, res, next) => {

    console.log(err)
    res.status(500).json({msg: 'something went wrong'})

})


