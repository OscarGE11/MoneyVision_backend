import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    name: String,
    description: String,
  },
  { versionKey: false, timestamps: true }
);

const CategoryModel = mongoose.model('Category', categorySchema);

export const showCategories = async () => {
  const category = await CategoryModel.find();
  console.log(category);
};

export const createCategory = async () => {
  const category = new CategoryModel({
    name: 'viajes',
    description: 'gastos relacionados con los viajes',
  });
  const result = await category.save();
  console.log(result);
};
