import { Schema } from 'mongoose'
import { v4 as uuid } from 'uuid'

export const chatRoomSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => uuid().replace(/-/g, '')
    },
    userIds: Array,
    type: String,
    chatInitiator: String
  },
  {
    timestamps: true,
    collection: 'chatrooms'
  }
)
