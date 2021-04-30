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
import React, { useState, useEffect, FormEvent } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import FromContainer from '../components/FromContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, updateProduct } from '../store/actions/product'
import { PRODUCT_UPDATE_RESET } from '../store/actions/productActionTypes'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps<{ id: string }> {}

const ProductEditScreen: React.FC<Props> = ({ match, history }) => {
  const productId: string = match.params.id

  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [category, setCategory] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [brand, setBrand] = useState<string>('')
  const [countInStock, setCountInStock] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)

  const dispatch = useDispatch()
  const { loading, error, product } = useSelector(
    (state: AppState) => state.productDetails
  )

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = useSelector((state: AppState) => state.productUpdate)

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setCategory(product.category)
        setDescription(product.description)
        setCountInStock(product.countInStock)
        setBrand(product.brand)
      }
    }
  }, [dispatch, product, productId, history, successUpdate])

  const uploadFileHandler = async (event: any) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        description,
        countInStock
      })
    )
  }
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FromContainer>
        <h1>Edit Product</h1>
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
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Number Of Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number Of Stock"
                value={countInStock}
                onChange={(e) =>
                  setCountInStock(+e.target.value)
                }></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand Name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image Url"
                value={image}
                onChange={(e) => setImage(e.target.value)}></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}>
                {uploading && <Loader />}
              </Form.File>
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

export default ProductEditScreen
