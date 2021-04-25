import axios from 'axios'
import { Dispatch } from 'redux'

import { AppState } from '../store'
import { CartActionTypes, CART_ADD_ITEM } from './cartActionTypes'

export const addToCart = (id: string, qty: number) => async (
  dispatch: Dispatch<CartActionTypes>,
  getState: () => AppState
) => {
  const { data } = await axios.get(`/api/products/${id}`)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
