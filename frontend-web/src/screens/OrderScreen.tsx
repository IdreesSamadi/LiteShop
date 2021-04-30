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
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row, ListGroup, Image, Button } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { deliverOrder, getOrderDetails, payOrder } from '../store/actions/order'
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET
} from '../store/actions/orderActionTypes'
import { IOrder } from '../store/reducers/models/orderModel'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps<{ id: string }> {}

const OrderScreen: React.FC<Props> = ({ match, history }) => {
  const [sdkReady, setSdkReady] = useState<boolean>(false)

  const orderId: string = match.params.id

  const {
    order,
    loading,
    error
  }: {
    order: IOrder
    loading: boolean
    error: string
  } = useSelector((state: AppState) => state.orderDetails)

  const {
    loading: loadingPay,
    success: successPay
  }: {
    loading: boolean
    success: boolean
  } = useSelector((state: AppState) => state.orderPay)

  const {
    loading: loadingDeliver,
    success: successDeliver
  }: {
    loading: boolean
    success: boolean
  } = useSelector((state: AppState) => state.orderDeliver)

  const { userInfo } = useSelector((state: AppState) => state.userLogin)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    // ? maybe this method should be put in order action
    const addPayPalScript = async () => {
      const { data: clientId }: { data: string } = await axios.get(
        '/api/config/paypal'
      )
      const script: HTMLScriptElement = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET }) // ? questionable place to dispatch reason : to not refresh after successful payment
      dispatch({ type: ORDER_DELIVER_RESET }) // ? questionable place to dispatch reason : to not refresh after successful payment
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!(window as any).paypal) {
        addPayPalScript()
      }
    } else {
      setSdkReady(true)
    }
  }, [dispatch, orderId, successPay, order, successDeliver, userInfo, history])

  const successPaymentHandler = (paymentResult: any) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId!))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message message={error} title="Error" variant="danger" />
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>Name: </strong>
              {order.user.name}
              <br />
              <strong>Email: </strong>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message message="Delivered" variant="success"></Message>
              ) : (
                <Message message="Not Delivered" variant="danger"></Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method: </h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message message="Paid" variant="success"></Message>
              ) : (
                <Message message="Not Paid" variant="danger"></Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items: </h2>
              {order.orderItems.length === 0 ? (
                <Message
                  title="Ops!"
                  variant="info"
                  message="Your Order Is Empty"></Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                <Col>
                  ${order.totalPrice - order.shippingPrice - order.taxPrice}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}></PayPalButton>
                )}
              </ListGroup.Item>
            )}
            {loadingDeliver && <Loader />}

            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" block onClick={deliverHandler}>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
