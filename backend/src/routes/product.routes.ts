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
import express from 'express'

import {
  getProduct,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct
} from '../controllers/product.controller'
import { isAdmin } from '../middleware/adminMiddleware'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/:id', getProduct)
router.delete('/:id', protect, isAdmin, deleteProduct)
router.put('/:id', protect, isAdmin, updateProduct)
router.get('/', getProducts)
router.post('/', protect, isAdmin, createProduct)

export default router
