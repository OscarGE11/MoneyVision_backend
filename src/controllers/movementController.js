import { MovementModel } from '../models/Movement.js';

// Functior for creating a movement
export const createMovement = async (req, res) => {
  const { title, description, amount, typeOfMovement, category } = req.body;

  try {
    const newMovement = new MovementModel({
      title,
      description,
      amount,
      typeOfMovement,
      // category: req.category.id,
    });

    await newMovement.save();
    res.status(201).json(newMovement);
  } catch (err) {
    res.status(500).json({ message: 'Error creating the movement', err });
  }
};

// Function for getting all the movements
export const getAllMovements = async (req, res) => {
  try {
    const movements = await MovementModel.find().populate('category', 'name');
    res.status(200).json(movements);
  } catch (err) {
    res.status(500).json({ message: 'Error getting the movements', err });
  }
};
