import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/config'

const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30h'
  })
}

export default generateToken
