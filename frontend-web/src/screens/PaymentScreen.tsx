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
import React, { useState, FormEvent } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import CheckoutSteps from '../components/CheckoutSteps'
import FromContainer from '../components/FromContainer'
import { savePaymentMethod } from '../store/actions/cart'
import { IAddress } from '../store/reducers/models/addressModel'
import { AppState } from '../store/store'

interface Props extends RouteComponentProps {}

const PaymentScreen: React.FC<Props> = ({ history }) => {
  const { shippingAddress }: { shippingAddress: IAddress } = useSelector(
    (state: AppState) => state.cart
  )

  if (!shippingAddress) {
    history.push('/shipping')
  }
  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState<string>('PayPal')

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  return (
    <FromContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Cart"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
            <Form.Check
              type="radio"
              label="Klarna"
              id="Klarna"
              name="paymentMethod"
              value="Klarna"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          CONTINUE
        </Button>
      </Form>
    </FromContainer>
  )
}

export default PaymentScreen
