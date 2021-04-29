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
import { Button, Table } from 'react-bootstrap'
import { X, Check2, Pen, Trash } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers } from '../store/actions/admin'
import { AppState } from '../store/store'

const UserListScreen: React.FC = () => {
  const dispatch = useDispatch()
  const { loading, error, users } = useSelector(
    (state: AppState) => state.adminUsersList
  )

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])

  const deleteHandler = (id: string) => {}
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
              <th>----</th>
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
                  <LinkContainer to={`user/${user._id}/edit`}>
                    <Button variant="light" size="sm">
                      <Pen />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteHandler(user._id)}>
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
