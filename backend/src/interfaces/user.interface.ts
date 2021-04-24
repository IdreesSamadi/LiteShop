import { Document } from 'mongoose'

interface IUser extends Document {
  name: string
  email: string
  password: string
  isAdmin: boolean
}

export default IUser
