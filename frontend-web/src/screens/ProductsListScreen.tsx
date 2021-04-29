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
import { Button, Table, Modal, Row, Col } from 'react-bootstrap'
import { Pen, Trash, Plus } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { RouteComponentProps } from 'react-router-dom'

import IProduct from '../Models/product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../store/actions/product'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps {}

const ProductsListScreen: React.FC<Props> = ({ history, match }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [productId, setProductId] = useState<string>()

  const dispatch = useDispatch()
  const {
    loading,
    error,
    products
  }: {
    loading: boolean
    products: IProduct[]
    error: string | undefined
  } = useSelector((state: AppState) => state.productList)

  const { userInfo } = useSelector((state: AppState) => state.userLogin)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const createProductHandler = () => {}

  const deleteHandler = () => {
    setShowModal(false)
  }
  const deleteModalHandler = (id: string) => {
    setProductId(id)
    setShowModal(true)
  }
  const modalCloseHandler = () => setShowModal(false)
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <Plus />
            Create Product
          </Button>
        </Col>
      </Row>
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
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" size="sm">
                      <Pen />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteModalHandler(product._id)}>
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

export default ProductsListScreen
