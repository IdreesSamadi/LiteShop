/**
 * Copyright 2021 Idrees Samadi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'

import IProduct from '../interfaces/product.interface'
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

const deleteProduct: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.remove()
      res.json({ message: 'Product Is Deleted' })
    } else {
      res.status(404)
      throw new Error('Product Not Found')
    }
  }
)

const createProduct: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res, next) => {
    const product: IProduct = new Product({
      name: 'Sample name',
      price: 0,
      user: (req as any).user._id,
      image: '/images/sample.jpg',
      brand: 'Sample Brand',
      category: 'Sample Category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createProduct)
  }
)

const updateProduct: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res, next) => {
    const productData: IProduct = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
      product.name = productData.name
      product.price = productData.price
      product.description = productData.description
      product.image = productData.image
      product.brand = productData.brand
      product.category = productData.category
      product.countInStock = productData.countInStock

      const updatedProduct = await product.save()
      res.status(201).json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product Not Found')
    }
  }
)

export { getProduct, getProducts, deleteProduct, updateProduct, createProduct }
