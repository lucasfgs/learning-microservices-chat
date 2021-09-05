
import { RepositoryError } from '@application/errors/RepositoryError'
import { IChatRoom, TInitiateChatRoomResponse } from '@domain/models/IChatRoom'
import mongoose, { Model, Schema } from 'mongoose'
import { v4 as uuid } from 'uuid'

interface IChatRoomModel extends Model<IChatRoom> {
  initiateChat(userIds: string[], chatInitiator: string): Promise<TInitiateChatRoomResponse>
  getChatRoomsByUserId(userId: string): Promise<IChatRoom[]>
  getChatRoomByRoomId(roomId: string): Promise<IChatRoom[]>
}

export const chatRoomSchema = new Schema<IChatRoom, IChatRoomModel>(
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
 */
chatRoomSchema.statics.initiateChat = async function (userIds, chatInitiator) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds]
      }
    })
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        chatRoomId: availableRoom._id
      }
    }

    const newRoom = await this.create({ userIds, chatInitiator })
    return {
      isNew: true,
      message: 'creating a new chatroom',
      chatRoomId: newRoom._id
    }
  } catch (error) {
    console.log('error on start chat method', error)
    throw new RepositoryError('Could not initiate chat')
  }
}

export const ChatRoomModel = mongoose.model('ChatRoom', chatRoomSchema)
