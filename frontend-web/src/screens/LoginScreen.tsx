import React, { useState, useEffect, FormEvent } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import FromContainer from '../components/FromContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../store/actions/user'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps<{ id: string }> {}

const LoginScreen: React.FC<Props> = ({ location, history }) => {
  const redirect: string = location.search ? location.search.split('=')[1] : '/'

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useDispatch()
  const { loading, error, userInfo } = useSelector(
    (state: AppState) => state.userLogin
  )

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <FromContainer>
      <h1>Sign In</h1>
      {error && <Message message={error} variant="danger"></Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FromContainer>
  )
}

export default LoginScreen
