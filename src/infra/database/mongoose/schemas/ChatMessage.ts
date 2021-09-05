import { Schema } from 'mongoose'
import { v4 as uuid } from 'uuid'

export const MESSAGE_TYPES = {
  TYPE_TEXT: 'text'
}

export const readByRecipientSchema = new Schema(
  {
    _id: false as Boolean,
    readByUserId: String,
    readAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: false
  }
)

export const chatMessageSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => uuid().replace(/-/g, '')
    },
    chatRoomId: String,
    message: Schema.Types.Mixed,
    type: {
      type: String,
      default: () => MESSAGE_TYPES.TYPE_TEXT
    },
    postedByUser: String,
    readByRecipients: [readByRecipientSchema]
  },
  {
    timestamps: true,
    collection: 'chatmessages'
  }
)
