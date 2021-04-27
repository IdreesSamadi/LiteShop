import express from 'express'

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile
} from '../controllers/user.controller'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.post('/', registerUser)
export default router
