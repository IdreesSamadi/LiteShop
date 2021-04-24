import { Document, Types } from 'mongoose'

import IReview from './review.interface'
import IUser from './user.interface'

type ID = Types.ObjectId

interface IProduct extends Document {
  user: ID | IUser
  name: string
  image: string
  description: string
  brand: string
  category: string
  price: number
  countInStock: number
  reviews: ID[] | IReview[]
  rating: number
  numReviews: number
}

export default IProduct
