/**
 * Copyright 2021 Idrees Samadi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import IProduct from '../Models/product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Rating from '../components/Rating'
import {
  createProductReview,
  listProductDetails
} from '../store/actions/product'
import { PRODUCT_CREATE_REVIEW_RESET } from '../store/actions/productActionTypes'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps<{ id: string }> {}

const ProductScreen: React.FC<Props> = ({ history, match }) => {
  const [qty, setQty] = useState<number>(1)
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState<string>('')

  const dispatch = useDispatch()
  const {
    loading,
    error,
    product
  }: {
    loading: boolean
    error: string | undefined
    product: IProduct
  } = useSelector((state: AppState) => state.productDetails)

  const { error: errorReview, success: successReview } = useSelector(
    (state: AppState) => state.productCreateReview
  )

  const { userInfo } = useSelector((state: AppState) => state.userLogin)

  useEffect(() => {
    if (successReview) {
      setComment('')
      setRating(0)
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
  }, [match, dispatch, successReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const options: JSX.Element[] = [
    ...Array((product as IProduct).countInStock).keys()
  ].map((q) => {
    return (
      <option key={+q + 1} value={+q + 1}>
        {+q + 1}
      </option>
    )
  })

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment
      })
    )
  }

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
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={5} lg={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4} lg={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    text={`${product.numReviews} reviews`}
                    value={product.rating!}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: ${product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
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
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                              setQty(+e.target.value)
                            }}>
                            {options}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      block
                      disabled={product.countInStock === 0}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="my-5">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews && product.reviews.length === 0 && (
                <Message message="No Reviews" variant="info" />
              )}
              <ListGroup variant="flush">
                {product.reviews &&
                  product.reviews.map((review: any) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating}></Rating>
                      <p>{review.createdAt.substring(0, 10)}</p>

                      {review.comment}
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  <h5>Tell us What You Think About This Product</h5>
                  {errorReview && (
                    <Message variant="danger" message={errorReview}></Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(+e.target.value)}>
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={comment}
                          rows={3}
                          onChange={(e) =>
                            setComment(e.target.value)
                          }></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please
                      <Link to="/login"> Sing in </Link>
                      To Write Review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
