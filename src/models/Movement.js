import mongoose, { Schema } from 'mongoose';
import { TYPE_OF_MOVEMENT_ENUM } from '../utils/ENUMS.js';

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
      enum: TYPE_OF_MOVEMENT_ENUM,
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
