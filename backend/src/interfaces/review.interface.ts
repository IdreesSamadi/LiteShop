import { Document } from 'mongoose'

interface IReview extends Document {
  name: string
  comment: string
  rating: number
}

export default IReview
