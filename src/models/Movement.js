import mongoose, { Schema } from 'mongoose';

const movementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    typeOfMovement: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const MovementModel = mongoose.model('Movement', movementSchema);

export const createMovement = async () => {
  const movement = new MovementModel({
    title: 'Paga la coca',
    description: 'paga',
    amount: 1000,
    typeOfMovement: 'hola',
    category: '66953094a13623ccfcd0b6eb',
  });
  const result = await movement.save();
  console.log(result);
};

export const showMovements = async () => {
  const movements = await MovementModel.find().populate('category', 'name');
  console.log(movements);
};