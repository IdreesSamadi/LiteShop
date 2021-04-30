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

export { getProduct, getProducts, deleteProduct }
