import { RequestHandler } from 'express'

import Products from '../data/products'

const getProducts: RequestHandler<{ id: string }> = (req, res, next) => {
  res.status(200).json(Products)
}

const getProduct: RequestHandler<{ id: string }> = (req, res, next) => {
  // const product = Products.find(p=> p._id === req.params.id)
  // res.status(200).json(product)
}

export default {
  getProduct,
  getProducts
}
