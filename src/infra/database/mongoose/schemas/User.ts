import mongoose, { Model, Schema } from 'mongoose'
import { v4 as uuid } from 'uuid'

import { NotFoundError } from '@application/errors/NotFoundError'
import { RepositoryError } from '@application/errors/RepositoryError'
import { IUser } from '@domain/models/IUser'

interface IUserModel extends Model<IUser> {
  createUser(name: string): Promise<IUser>
  getUserById(id: string): Promise<IUser>
  getUsers(): Promise<IUser[]>
  deleteByUserById(): Promise<IUser>
}

export const userSchema = new Schema<IUser, IUserModel>(
  {
    _id: {
      type: String,
      default: () => uuid().replace(/-/g, '')
    },
    name: String
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

/**
 * @param {String} firstName
 * @param {String} lastName
 * @returns {Object} new user object created
 */
userSchema.statics.createUser = async function (name) {
  try {
    const user = await this.create({ name })
    return user
  } catch (error) {
    throw new RepositoryError('Could not create user')
  }
}

/**
 * @param {String} id, user id
 * @return {Object} User profile object
 */
userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id })
    if (!user) throw new NotFoundError('No user with this id found')
    return user
  } catch (error) {
    throw new RepositoryError('Could not get user')
  }
}

/**
 * @return {Array} List of all users
 */
userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find()
    return users
  } catch (error) {
    throw new RepositoryError('Could not get users')
  }
}

/**
 * @param {Array} ids, string of user ids
 * @return {Array of Objects} users list
 */
userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } })
    return users
  } catch (error) {
    throw new RepositoryError('Could not get users')
  }
}

/**
 * @param {String} id - id of user
 * @return {Object} - details of action performed
 */
userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.remove({ _id: id })
    return result
  } catch (error) {
    throw new RepositoryError('Could not delete user')
  }
}

export const UserModel = mongoose.model('User', userSchema)
