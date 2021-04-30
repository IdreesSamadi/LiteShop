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
import { X } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { RouteComponentProps } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../store/actions/order'
import { IOrder } from '../store/reducers/models/orderModel'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps {}

const UserListScreen: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch()
  const {
    loading,
    error,
    orders
  }: {
    loading: boolean
    error: string | undefined
    orders: IOrder[]
  } = useSelector((state: AppState) => state.orderList)

  const { userInfo } = useSelector((state: AppState) => state.userLogin)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message title="Error" message={error} variant="danger" />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt?.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt?.substring(0, 10)
                  ) : (
                    <X className="text-danger" />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt?.substring(0, 10)
                  ) : (
                    <X className="text-danger" />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" size="sm">
                      Details
                    </Button>
                  </LinkContainer>
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
