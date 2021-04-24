import React, { useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { listProductDetails } from '../store/actions/product'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps<{ id: string }> {}

const ProductScreen: React.FC<Props> = ({ match }) => {
  const dispatch = useDispatch()
  const { loading, error, product } = useSelector(
    (state: AppState) => state.productDetails
  )

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [match, dispatch])

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} title="Error" variant="danger" />
      ) : (
        <Row>
          <Col lg={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col lg={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  text={`${product.numReviews} reviews`}
                  value={product.rating}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button block disabled={product.countInStock === 0}>
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
