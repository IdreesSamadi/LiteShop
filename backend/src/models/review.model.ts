import mongoose, { Schema } from 'mongoose'

import IReview from '../interfaces/review.interface'

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IReview>('Review', reviewSchema)
