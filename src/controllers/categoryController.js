import { CategoryModel } from '../models/Category.js'
import {
  categorySchema as categoryValidationSchema,
  idSchema
} from '../utils/validation.js'

// Function for creating a new category
export const createCategory = async (req, res) => {
  const { error, value } = categoryValidationSchema.validate(req.body)

  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation error', errs: error.details })
  }

  try {
    const newCategory = new CategoryModel(value)
    await newCategory.save()
    res.status(201).json(newCategory)
  } catch (err) {
    /* 11000 is the code that MongoDB throws when a key value is duplicated
    and is defined as unique. */

    if (err.code === 11000) {
      const duplicateCategory = Object.keys(err.keyValue)[0]
      res.status(409).json({ message: `${duplicateCategory} already exists` })
    }
    res.status(500).json({ message: 'Error creating category', error: err })
  }
}

// Function for getting all the categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find()
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json({ message: 'Error getting categories', error: err })
  }
}

export const getCategoryById = async (req, res) => {
  const { error } = idSchema.validate(req.params)

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid ID format', errors: error.details })
  }

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
  const { error } = idSchema.validate(req.params)

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid ID format', errors: error.details })
  }
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id)

    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' })
    }

    res.status(200).json({
      message: 'Category deleted successfully'
    })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting the category', err })
  }
}

export const updateCategory = async (req, res) => {
  const { error: idError } = idSchema.validate({ id: req.params.id })

  if (idError) {
    return res
      .status(400)
      .json({ message: 'Invalid ID format', errors: idError.details })
  }

  const { error: bodyError, value } = categoryValidationSchema.validate(
    req.body
  )

  if (bodyError) {
    return res
      .status(400)
      .json({ message: 'Validation error', errors: bodyError.details })
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
    res.status(500).json({ message: 'Error updating the category', err })
  }
}
