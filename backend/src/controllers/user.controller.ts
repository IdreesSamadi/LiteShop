import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'

import User from '../models/user.model'
import generateToken from '../utils/generateToken'

const authUser: RequestHandler = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

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

export { authUser, getUserProfile }
