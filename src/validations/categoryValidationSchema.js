import Joi from 'joi'

export const categorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should be a type of text',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have a minimum length of 3 characters',
    'string.max': 'Name should have a maximum length of 30 characters',
    'any.required': 'Name is required'
  }),
  description: Joi.string().allow('').optional().messages({
    'string.base': 'Description should be a type of text'
  })
}).strict()
