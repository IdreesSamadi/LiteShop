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
import React, { useState, useEffect, FormEvent } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import FromContainer from '../components/FromContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { updateUser } from '../store/actions/admin'
import { ADMIN_UPDATE_USER_RESET } from '../store/actions/adminActionTypes'
import { getUserDetails } from '../store/actions/user'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps<{ id: string }> {}

const UserEditScreen: React.FC<Props> = ({ match, history }) => {
  const userId: string = match.params.id

  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const dispatch = useDispatch()
  const { loading, error, user } = useSelector(
    (state: AppState) => state.userDetails
  )

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = useSelector((state: AppState) => state.adminUpdateUser)

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_UPDATE_USER_RESET }) // ! should this be Here
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId, true))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, user, userId, successUpdate, history])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: user._id,
        name,
        email,
        isAdmin
      })
    )
  }
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FromContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <Message title="Error" message={errorUpdate} variant="danger" />
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message title="Error" message={error} variant="danger" />
        ) : (
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
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FromContainer>
    </>
  )
}

export default UserEditScreen
