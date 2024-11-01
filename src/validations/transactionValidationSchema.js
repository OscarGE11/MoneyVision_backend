import Joi from 'joi'
import { TYPE_OF_TRANSACTION_ENUM } from '../utils/ENUMS.js'

export const transactionSchema = Joi.object({
  description: Joi.string().allow('').optional().required().messages({
    'any.required': 'Description is required',
    'string.base': 'Description should be a type of text',
    'string.empty': 'Description cannot be empty',
    'string.min': 'Description should have a minimum length of 3 characters',
    'string.max': 'Description should have a maximum length of 50 characters'
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
  }),
  user: Joi.string().required().messages({
    'string.base': 'User should be a type of text',
    'any.required': 'User ID is required'
  })
}).strict()
