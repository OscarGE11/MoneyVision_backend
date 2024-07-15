import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    name: String,
    description: String,
  },
  { versionKey: false, timestamps: true }
);

export const CategoryModel = mongoose.model('Category', categorySchema);
