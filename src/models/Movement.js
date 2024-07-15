import mongoose, { Schema } from 'mongoose';

const typeOfMovementEnum = ['expense', 'income'];

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
      enum: typeOfMovementEnum,
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
    title: 'cena Vips',
    description: 'cena vips en parque sur el martes',
    amount: 1000,
    typeOfMovement: 'expense',
    category: '66953094a13623ccfcd0b6eb',
  });
  const result = await movement.save();
  console.log(result);
};

export const showMovements = async () => {
  const movements = await MovementModel.find().populate('category', 'name');
  console.log(movements);
};
