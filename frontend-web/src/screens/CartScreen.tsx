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
import React, { ChangeEvent, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, Link } from 'react-router-dom'

import Message from '../components/Message'
import { addToCart, removeFromCart } from '../store/actions/cart'
import { ICart } from '../store/reducers/models/cartModel'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps<{ id: string }> {}

const CartScreen: React.FC<Props> = ({ match, location, history }) => {
  const productId: string = match.params.id
  const qty: number = location.search ? +location.search.split('=')[1] : 1

  const dispatch = useDispatch()
  const { cartItems } = useSelector((state: AppState) => state.cart)
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message message="Your Cart Is Empty" variant="info" title="Ops!" />
        ) : (
          <ListGroup>
            {(cartItems as ICart[]).map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        dispatch(addToCart(item.product, +e.target.value))
                      }>
                      {[...Array(item.countInStock).keys()].map((q) => {
                        return (
                          <option key={+q + 1} value={+q + 1}>
                            {+q + 1}
                          </option>
                        )
                      })}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        removeFromCartHandler(item.product)
                      }}>
                      <Trash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup>
          <ListGroup.Item variant="flash">
            <h3>
              Subtotal (
              {(cartItems as ICart[]).reduce((acc, item) => {
                return acc + item.qty
              }, 0)}
              ) Items
            </h3>
            Total: $
            {(cartItems as ICart[]).reduce(
              (acc, item) => +(acc + item.qty * item.price).toFixed(2),
              0
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              block
              disabled={cartItems.length === 0}
              type="button"
              onClick={checkoutHandler}>
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  )
}

export default CartScreen
