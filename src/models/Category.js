import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: { type: String }
  },
  { versionKey: false, timestamps: true }
)

export const CategoryModel = mongoose.model('Category', categorySchema)
