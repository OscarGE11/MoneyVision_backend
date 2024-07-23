import mongoose, { Schema } from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    money: {
      type: Number,
      required: true
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
      }
    ]
  },
  { versionKey: false, timestamps: true }
)

export const UserModel = mongoose.model('User', userSchema)
