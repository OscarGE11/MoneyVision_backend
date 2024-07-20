import { CategoryModel } from '../models/Category.js'
import { categorySchema as categoryValidationSchema } from '../validations/categoryValidationSchema.js'

// Function for creating a new category
export const createCategory = async (req, res) => {
  const { error, value } = categoryValidationSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      error: error.details.map((detail) => detail.message)
    })
  }

  try {
    const newCategory = new CategoryModel(value)
    await newCategory.save()
    res.status(201).json(newCategory)
  } catch (err) {
    // 1100 = MongoDB error if unique key value is duplicated
    if (err.code === 11000) {
      const duplicateCategory = Object.keys(err.keyValue)[0]
      res.status(409).json({ message: `${duplicateCategory} already exists` })
    }
    res.status(500).json({ message: 'Error creating category' })
  }
}

// Function for getting all the categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find()
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json({ message: 'Error getting categories' })
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id)

    if (!category) {
      res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json({ message: 'Error getting the category' })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id)

    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' })
    }

    res.status(200).json({
      message: 'Category deleted successfully'
    })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting the category' })
  }
}

export const updateCategory = async (req, res) => {
  const { error, value } = categoryValidationSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      error: error.details.map((detail) => detail.message)
    })
  }

  try {
    const updateCategory = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      value,
      {
        new: true
      }
    )

    if (!updateCategory) {
      res.status(404).json({ message: 'Category not found' })
    }

    res.status(200).json(updateCategory)
  } catch (err) {
    res.status(500).json({ message: 'Error updating the category' })
  }
}
