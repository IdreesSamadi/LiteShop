/*
 *   Copyright (c) 2021 Idrees Samadi
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
import React, { useEffect } from 'react'
import { Button, Col, Row, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { addDecimals } from '../shared/utility'
import { createOrder } from '../store/actions/order'
import { IAddress } from '../store/reducers/models/addressModel'
import { ICart } from '../store/reducers/models/cartModel'
import { IOrder } from '../store/reducers/models/orderModel'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps {}

const PlaceOrderScreen: React.FC<Props> = ({ history }) => {
  const {
    shippingAddress,
    paymentMethod,
    cartItems
  }: {
    shippingAddress: IAddress
    paymentMethod: string
    cartItems: ICart[]
  } = useSelector((state: AppState) => state.cart)

  const {
    order,
    success,
    error
  }: {
    order: IOrder
    success: boolean
    error: string
  } = useSelector((state: AppState) => state.orderCreate)

  const dispatch = useDispatch()

  //calculate prices
  const itemsPrice = cartItems.reduce(
    (preValue, item) => preValue + item.price * item.qty,
    0
  )
  const shipping = itemsPrice < 100 ? 10 : 0
  const tax = addDecimals(0.15 * itemsPrice)
  const total = (itemsPrice + shipping + +tax).toFixed(2)

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shipping,
        taxPrice: +tax,
        totalPrice: +total
      })
    )
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address},{shippingAddress.city},
                {shippingAddress.postalCode},{shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method: </h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items: </h2>
              {cartItems.length === 0 ? (
                <Message
                  title="Ops!"
                  variant="info"
                  message="Your Cart Is Empty"></Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${shipping}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${tax}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${total}</Col>
              </Row>
            </ListGroup.Item>
            {error && (
              <ListGroup.Item>
                <Message message={error} variant="danger"></Message>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button
                block
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}>
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
