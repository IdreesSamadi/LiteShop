import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import IProduct from '../Models/product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import { listProducts } from '../store/actions/product'
import { AppState } from '../store/store'

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(
    (state: AppState) => state.productList
  )

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message title="Error" message={error} variant="danger" />
      ) : (
        <Row>
          {(products as IProduct[]).map((product) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            )
          })}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
