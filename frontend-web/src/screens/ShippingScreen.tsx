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
import React, { useState, FormEvent, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import FromContainer from '../components/FromContainer'
import { saveShippingAddress } from '../store/actions/cart'
import { IAddress } from '../store/reducers/models/addressModel'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps {}

const ShippingScreen: React.FC<Props> = ({ history }) => {
  const { shippingAddress }: { shippingAddress: IAddress } = useSelector(
    (state: AppState) => state.cart
  )

  useEffect(() => {
    setAddress(shippingAddress.address)
    setCity(shippingAddress.city)
    setCountry(shippingAddress.country)
    setPostCode(shippingAddress.postalCode)
  }, [shippingAddress])

  const dispatch = useDispatch()

  const [address, setAddress] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [postalCode, setPostCode] = useState<string>('')

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }
  return (
    <FromContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            required
            onChange={(e) => setPostCode(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          CONTINUE
        </Button>
      </Form>
    </FromContainer>
  )
}

export default ShippingScreen
