import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'

import ProductModel from '../Models/product'
import Product from '../components/Product'

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
      console.log(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default HomeScreen
