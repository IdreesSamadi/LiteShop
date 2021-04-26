import { Response, NextFunction, Request } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/config'
import User from '../models/user.model'

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.headers.authorization
    let decoded: any

    if (!authHeader) {
      res.status(401)
      throw new Error('Not Authorized')
    }

    const token = authHeader.split(' ')[1]
    if (authHeader.startsWith('Bearer')) {
      try {
        decoded = jwt.verify(token, JWT_SECRET)
      } catch (error) {
        error.status(500)
        throw error
      }
    }

    if (!decoded) {
      res.status(401)
      throw new Error('Not Authorized')
    }

    ;(req as any).user = await User.findById(decoded.id).select('-password')
    next()
  }
)

export { protect }
