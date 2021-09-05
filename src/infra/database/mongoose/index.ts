import { MongoHelper } from './helper/MongoHelper'

export async function createConnection () {
  try {
    await MongoHelper.connect('mongodb://localhost:27017/chat')
  } catch (error) {
    console.error(error)
  }
}
