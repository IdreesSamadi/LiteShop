import { Document, Types } from 'mongoose'

import IUser from './user.interface'

type ID = Types.ObjectId

interface IReview extends Document {
  name: string
  comment: string
  rating: number
  user: ID | IUser
}

export default IReview
