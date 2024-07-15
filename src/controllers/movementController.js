import { MovementModel } from '../models/Movement.js';

// Function for creating a movement
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

// Function for getting one movement

export const getMovementByID = async (req, res) => {
  try {
    const movement = await MovementModel.findById(req.params.id).populate(
      'category',
      'name'
    );

    if (!movement) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    res.status(200).json(movement);
  } catch (err) {
    res.status(500).json({ message: 'Error getting the movement', err });
  }
};

export const updateMovement = async (req, res) => {
  try {
    const movementUpdate = await MovementModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(202).json(movementUpdate);

    if (!movementUpdate) {
      res.status(404).json({ message: 'Movement not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating the movement' });
  }
};

export const deleteMovement = async (req, res) => {
  try {
    await MovementModel.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Movement deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting the movement' });
  }
};
