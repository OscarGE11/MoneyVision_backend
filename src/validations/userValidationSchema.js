import Joi from 'joi'

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should be a type of text',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have a minimum lenght of 3 characters',
    'string.max': 'Name should have a maximum lenght of 30 characters',
    'any.required': 'Name is required'
  }),
  username: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a type of text',
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username should have a minimum lenght of 3 characters',
    'string.max': 'Username should have a maximum lenght of 30 characters',
    'any.required': 'Username is required'
  }),
  email: Joi.string().required().email().messages({
    'string.base': 'Email should be a type of text',
    'string.email': 'Email format is incorrect',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required'
  }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
    .required()
    .messages({
      'string.base': 'Password should be a type of text',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should have a minimum length of {#limit}',
      'string.pattern.base':
        'Password must contain at least one letter and one number',
      'any.required': 'Password is required'
    }),
  money: Joi.number().required().messages({
    'number.base': 'Money should be a type of number',
    'any.required': 'Money is required'
  }),
  transactionSchema: Joi.string().optional().messages({
    'string.base': 'Transaction ID should be a type of text',
    'any.required': 'Transaction ID is required'
  })
}).strict()
