import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'

import User from '../models/user.model'
import generateToken from '../utils/generateToken'

const authUser: RequestHandler = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user?.matchPassword) {
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
    } else {
      res.status(401)
      throw new Error('Invalid Email or Password')
    }
  }
})

const registerUser: RequestHandler = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User Already Exists')
  }

  const user = await User.create({
    name,
    email,
    password
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

const getUserProfile: RequestHandler = asyncHandler(async (req, res, next) => {
  const user = await User.findById((req as any).user._id)
  console.log(user)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

const updateUserProfile: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const user = await User.findById((req as any).user._id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
      const updatedUser = await user.save()

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id)
      })
    } else {
      res.status(404)
      throw new Error('User Not Found')
    }
  }
)
export { authUser, getUserProfile, registerUser, updateUserProfile }
