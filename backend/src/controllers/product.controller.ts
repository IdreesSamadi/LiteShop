import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'

import Product from '../models/product.model'

const getProducts: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res, next) => {
    const products = await Product.find({})
    res.json(products)
  }
)

const getProduct: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product Not Found')
    }
  }
)

export default {
  getProduct,
  getProducts
}
