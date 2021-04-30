/*
 *   Copyright (c) 2021 Idrees Samadi
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
import express from 'express'

import {
  addOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered
} from '../controllers/order.controller'
import { isAdmin } from '../middleware/adminMiddleware'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/', protect, addOrder)
router.get('/', protect, isAdmin, getOrders)
router.get('/myorders', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)
router.put('/:id/deliver', protect, isAdmin, updateOrderToDelivered)

export default router
