import React, { useState, useEffect, FormEvent } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import FromContainer from '../components/FromContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../store/actions/user'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps {}

const RegisterScreen: React.FC<Props> = ({ location, history }) => {
  const redirect: string = location.search ? location.search.split('=')[1] : '/'

  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [message, setMessage] = useState<string | null>(null)

  const dispatch = useDispatch()
  const { loading, error, userInfo } = useSelector(
    (state: AppState) => state.userRegister
  )

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password Do Not Match')
    } else {
      dispatch(register(name, email, password))
    }
  }
  return (
    <FromContainer>
      <h1>Sign Up</h1>
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
            onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already A Customer?&nbsp;
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FromContainer>
  )
}

export default RegisterScreen
