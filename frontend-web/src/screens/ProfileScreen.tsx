import React, { useState, useEffect, FormEvent } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails } from '../store/actions/user'
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
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, user, dispatch, userInfo])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password Do Not Match')
    } else {
      //dispatch()
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {error && <Message message={error} variant="danger"></Message>}
        {message && <Message message={message} variant="warning"></Message>}
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
      </Col>
    </Row>
  )
}

export default ProfileScreen
