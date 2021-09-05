import mongoose from 'mongoose'

export async function createConnection () {
  try {
    await mongoose.connect('mongodb://localhost:27017/chat')
  } catch (error) {
    console.error(error)
  }
}
