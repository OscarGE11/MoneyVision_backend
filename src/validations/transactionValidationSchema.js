import Joi from 'joi'
import { TYPE_OF_TRANSACTION_ENUM } from '../utils/ENUMS.js'

export const transactionSchema = Joi.object({
  title: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Title should be a type of text',
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title should have a minimum length of 3 characters',
    'string.max': 'Title should have a maximum length of 50 characters',
    'any.required': 'Title is required'
  }),
  description: Joi.string().allow('').optional().messages({
    'string.base': 'Description should be a type of text'
  }),
  amount: Joi.number().positive().required().messages({
    'number.base': 'Amount should be a type of number',
    'number.positive': 'Amount should be a positive number',
    'any.required': 'Amount is required'
  }),
  typeOfTransaction: Joi.string()
    .valid(...TYPE_OF_TRANSACTION_ENUM)
    .required()
    .messages({
      'string.base': 'Type of Transaction should be a type of text',
      'any.only': `Type of Transaction must be one of ${TYPE_OF_TRANSACTION_ENUM}`,
      'any.required': 'Type of Transaction is required'
    }),
  category: Joi.string().required().messages({
    'string.base': 'Category should be a type of text',
    'any.required': 'Category ID is required'
  })
}).strict()
