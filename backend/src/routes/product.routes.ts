import express from 'express'

import { getProduct, getProducts } from '../controllers/product.controller'

const router = express.Router()

router.get('/:id', getProduct)
router.get('/', getProducts)

export default router
