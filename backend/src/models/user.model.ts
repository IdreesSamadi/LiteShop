import bcrypt from 'bcryptjs'
import mongoose, { Schema, Document } from 'mongoose'

import IUser from '../interfaces/user.interface'

export interface IUserModel extends IUser, Document {
  matchPassword?(password: string): Promise<boolean>
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model<IUserModel>('User', userSchema)
