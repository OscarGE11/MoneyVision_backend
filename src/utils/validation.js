import Joi from 'joi'

/*   Validation schemas for the controllers */

export const transactionSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  amount: Joi.number().required().positive(),
  typeOfTransaction: Joi.string().valid('Income', 'Expense').required(),
  category: Joi.string().pattern(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format')
})

/* Schema in order to validate the ID's */

export const idSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')
    .required()
})

export const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string()
})

export const userSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  money: Joi.number().required(),

  /* The ID of the object transaction, is optional because it is possible
   that an user has not transactions when created. */

  transactionSchema: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format')
    .optional()
})
