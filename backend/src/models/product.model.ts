import mongoose, { Schema } from 'mongoose'

import IProduct from '../interfaces/product.interface'

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Review'
      }
    ],
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numReview: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IProduct>('Product', productSchema)
