import express from 'express'

import {
  authUser,
  getUserProfile,
  registerUser
} from '../controllers/user.controller'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)
router.post('/', registerUser)
export default router
