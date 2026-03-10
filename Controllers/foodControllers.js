import Food from '../Models/foodModel.js'
import {StatusCodes } from 'http-status-codes'

export const getAllFood = async (req, res) => {

    const { name } = req.query;
    let filter = {};

    if (name) {
        filter.name = { $regex: name, $options: "i"};
    }

    const foods = await Food.find(filter)
    res.status(StatusCodes.OK).json({foods})
}

export const addFood = async (req, res) => {
    const food = await Food.create(req.body);
    res.status(StatusCodes.CREATED).json({ food })
}

export const getFood = async (req, res) => {
    const food = await Food.findById(req.params.id)
    res.status(StatusCodes.OK).json({ food })
}

export const updateFood = async (req, res) => {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })

    res.status(StatusCodes.OK),json({ msg: 'food modified: ', food: updatedFood })
}

export const deleteFood = async (req, res) => {
    const removedFood = await Food.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({ msg: 'food deleted', food: removedFood})
}