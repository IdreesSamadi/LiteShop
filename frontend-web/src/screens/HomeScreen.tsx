import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import IProduct from '../Models/product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../store/actions/product'
import { AppState } from '../store/store'

interface Props
  extends RouteComponentProps<{ keyword?: string; pageNumber?: string }> {}

const HomeScreen: React.FC<Props> = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || '1'

  const dispatch = useDispatch()
  const { loading, error, products, page, pages } = useSelector(
    (state: AppState) => state.productList
  )

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message title="Error" message={error} variant="danger" />
      ) : (
        <>
          <Row>
            {(products as IProduct[]).map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              )
            })}
          </Row>
          <Paginate
            page={+page}
            pages={+pages}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
