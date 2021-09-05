
import { RepositoryError } from '@application/errors/RepositoryError'
import mongoose, { Schema } from 'mongoose'
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

/**
 * @param {String} userId - id of user
 * @return {Array} array of all chatroom that the user belongs to
 */
chatRoomSchema.statics.getChatRoomsByUserId = async function (userId) {
  try {
    const rooms = await this.find({ userIds: { $all: [userId] } })
    return rooms
  } catch (error) {
    throw new RepositoryError('Could not get chatroom')
  }
}

/**
 * @param {String} roomId - id of chatroom
 * @return {Object} chatroom
 */
chatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
  try {
    const room = await this.findOne({ _id: roomId })
    return room
  } catch (error) {
    throw new RepositoryError('Could not get chatroom')
  }
}

/**
 * @param {Array} userIds - array of strings of userIds
 * @param {String} chatInitiator - user who initiated the chat
 * @param {CHAT_ROOM_TYPES} type
 */
chatRoomSchema.statics.initiateChat = async function (userIds, type, chatInitiator) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds]
      },
      type
    })
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        chatRoomId: availableRoom._doc._id,
        type: availableRoom._doc.type
      }
    }

    const newRoom = await this.create({ userIds, type, chatInitiator })
    return {
      isNew: true,
      message: 'creating a new chatroom',
      chatRoomId: newRoom._doc._id,
      type: newRoom._doc.type
    }
  } catch (error) {
    console.log('error on start chat method', error)
    throw new RepositoryError('Could not initiate chat')
  }
}

export default mongoose.model('ChatRoom', chatRoomSchema)
