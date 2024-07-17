import { CategoryModel } from '../models/Category.js';

// Function for creating a new category
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = new CategoryModel({
      name,
      description,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: 'Error creating category', error: err });
  }
};

// Function for getting all the categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error getting categories', error: err });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error getting the category', err: err });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(
      req.params.id
    );

    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: 'Category deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting the category', err });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updateCategory = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateCategory) {
      res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json({ message: 'Error updating the category', err });
  }
};
