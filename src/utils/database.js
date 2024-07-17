import { connect } from 'mongoose'

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI, {})
    console.log('MongoDB connect succesfully')
  } catch (error) {
    console.log('MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

export default connectDB
