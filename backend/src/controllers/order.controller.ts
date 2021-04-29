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
import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'

import IOrder from '../interfaces/order.interface'
import Order from '../models/order.model'

const addOrder: RequestHandler<{}, IOrder> = asyncHandler(
  async (req, res, next) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No Order Items')
    } else {
      const order = new Order({
        user: (req as any).user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      })

      const createdOrder = await order.save()
      res.status(201).json(createdOrder)
    }
  }
)

const getOrderById: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order Not Found')
    }
  }
)

const updateOrderToPaid: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isPaid = true
      order.paidAt = new Date()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
      }

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order Not Found')
    }
  }
)

const getMyOrders: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res, next) => {
    const orders = await Order.find({ user: (req as any).user._id })
    res.json(orders)
  }
)

export { addOrder, getOrderById, updateOrderToPaid, getMyOrders }
