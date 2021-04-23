import express from 'express'
import productController from '../controllers/product'

const router = express.Router()

router.get('/product/:id', productController.getProduct)
router.get('/products', productController.getProducts)

export = router