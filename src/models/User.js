import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

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
    transactions: {
      type: Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  },
  { versionKey: false, timestamps: true }
)
userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)

  return await bcrypt.hash(password, salt)
}

userSchema.methods.compareHashedPassword = async (password) => {
  return await bcrypt.compare(password, this.password)
}

export const UserModel = mongoose.model('User', userSchema)
