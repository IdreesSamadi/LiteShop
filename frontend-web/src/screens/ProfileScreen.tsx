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
import React, { useState, useEffect, FormEvent } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { X } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { RouteComponentProps } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMyOrder } from '../store/actions/order'
import { getUserDetails, updateUserProfile } from '../store/actions/user'
import { IOrder } from '../store/reducers/models/orderModel'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps {}

const ProfileScreen: React.FC<Props> = ({ location, history }) => {
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [message, setMessage] = useState<string | null>(null)

  const dispatch = useDispatch()
  const { loading, error, user } = useSelector(
    (state: AppState) => state.userDetails
  )

  const { userInfo } = useSelector((state: AppState) => state.userLogin)

  const { success } = useSelector((state: AppState) => state.userUpdateProfile)

  const { loading: loadingOrder, error: errorOrders, orders } = useSelector(
    (state: AppState) => state.orderMyList
  )

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrder())
      } else {
        console.log(user.name)
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [user, history, dispatch, userInfo])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password Do Not Match')
    } else {
      console.log('before', success)
      console.log(user)
      dispatch(updateUserProfile({ _id: user._id, name, email, password }))
      console.log('after', success)
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {error && <Message message={error} variant="danger"></Message>}
        {message && <Message message={message} variant="warning"></Message>}
        {success && (
          <Message
            message="Profile Updated"
            variant="success"
            title="Yup"></Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrder ? (
          <Loader />
        ) : errorOrders ? (
          <Message message={errorOrders} variant="danger" title="Error" />
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID </th>
                <th>DATE </th>
                <th>TOTAL </th>
                <th>PAID </th>
                <th> DELIVERED </th>
                <th> ---- </th>
              </tr>
            </thead>
            <tbody>
              {(orders as IOrder[]).map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt!.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td className="text-center">
                    {order.isPaid ? (
                      order.paidAt!.substring(0, 10)
                    ) : (
                      <X className="text-danger" />
                    )}
                  </td>
                  <td className="text-center">
                    {order.isDelivered ? (
                      order.deliveredAt!.substring(0, 10)
                    ) : (
                      <X className="text-danger" />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button size="sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
