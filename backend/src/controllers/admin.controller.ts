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

import User from '../models/user.model'

const getUsers: RequestHandler = asyncHandler(async (req, res, next) => {
  const users = await User.find({})
  res.json(users)
})

const deleteUser: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (user) {
      await user.remove()
      res.json({ message: 'User Removed' })
    } else {
      res.status(404)
      throw new Error('User Not Found')
    }
  }
)

const getUserById: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res, next) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User Not Found')
    }
  }
)

const updateUser: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin
      const updatedUser = await user.save()

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
      })
    } else {
      res.status(404)
      throw new Error('User Not Found')
    }
  }
)

export { getUsers, deleteUser, getUserById, updateUser }
