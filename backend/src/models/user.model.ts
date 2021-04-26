import bcrypt from 'bcryptjs'
import mongoose, { Schema, Model } from 'mongoose'

import IUser from '../interfaces/user.interface'

export interface IUserModel extends IUser, Document {
  matchPassword(password: string): any
}

const userSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: true
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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model<IUserModel>('User', userSchema)
