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
import React, { useEffect, useState } from 'react'
import { Button, Table, Modal } from 'react-bootstrap'
import { X, Check2, Pen, Trash } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { RouteComponentProps } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { deleteUser, listUsers } from '../store/actions/admin'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps {}

const UserListScreen: React.FC<Props> = ({ history }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>()

  const dispatch = useDispatch()
  const { loading, error, users } = useSelector(
    (state: AppState) => state.adminUsersList
  )

  const { userInfo } = useSelector((state: AppState) => state.userLogin)
  const { success: successDelete } = useSelector(
    (state: AppState) => state.adminDeleteUser
  )

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = () => {
    if (userId) dispatch(deleteUser(userId))
    setShowModal(false)
  }
  const deleteModalHandler = (id: string) => {
    setUserId(id)
    setShowModal(true)
  }
  const modalCloseHandler = () => setShowModal(false)
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message title="Error" message={error} variant="danger" />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <Check2 className="text-success" />
                  ) : (
                    <X className="text-danger" />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" size="sm">
                      <Pen />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteModalHandler(user._id)}>
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={showModal} onHide={modalCloseHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>You Are About To Delete A User, Are You Sure?</Modal.Body>
        <Button block variant="secondary" onClick={modalCloseHandler}>
          Close
        </Button>
        <Button block variant="danger" onClick={deleteHandler}>
          delete
        </Button>
      </Modal>
    </>
  )
}

export default UserListScreen
