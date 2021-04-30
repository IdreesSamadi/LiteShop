/**
 * Copyright 2021 Idrees Samadi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import IProduct from '../../Models/product'
import { updateObject } from '../../shared/utility'
import {
  ProductActionTypes,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS
} from '../actions/productActionTypes'

interface IListState {
  loading: boolean
  products: IProduct[]
  pages?: number
  page?: number
  error?: string
}

interface IDetailsState {
  loading: boolean
  product: IProduct | {}
  error?: string
}

const initialDetailsState: IDetailsState = {
  product: {},
  loading: false
}

const initialListState: IListState = {
  products: [],
  loading: false
}

export const productReducer = (
  state: IListState = initialListState,
  action: ProductActionTypes
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return updateObject(state, { loading: true, products: [] })
    case PRODUCT_LIST_SUCCESS:
      return updateObject(state, {
        loading: false,
        products: action.payload.products,
        pages: +action.payload.pages,
        page: +action.payload.page
      })
    case PRODUCT_LIST_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    default:
      return state
  }
}

export const productDetailsReducer = (
  state: IDetailsState = initialDetailsState,
  action: ProductActionTypes
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return updateObject(state, { loading: true })
    case PRODUCT_DETAILS_SUCCESS:
      return updateObject(state, { loading: false, product: action.payload })
    case PRODUCT_DETAILS_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    default:
      return state
  }
}

export const productDeleteReducer = (
  state = {},
  action: ProductActionTypes
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return updateObject(state, { loading: true })
    case PRODUCT_DELETE_SUCCESS:
      return updateObject(state, { loading: false, success: true })
    case PRODUCT_DELETE_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    default:
      return state
  }
}

export const productCreateReducer = (
  state = {},
  action: ProductActionTypes
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return updateObject(state, { loading: true })
    case PRODUCT_CREATE_SUCCESS:
      return updateObject(state, {
        loading: false,
        success: true,
        product: action.payload
      })
    case PRODUCT_CREATE_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    case PRODUCT_CREATE_RESET:
      return updateObject({}, {})
    default:
      return state
  }
}

export const productUpdateReducer = (
  state = { product: {} },
  action: ProductActionTypes
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return updateObject(state, { loading: true })
    case PRODUCT_UPDATE_SUCCESS:
      return updateObject(state, {
        loading: false,
        success: true,
        product: action.payload
      })
    case PRODUCT_UPDATE_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    case PRODUCT_UPDATE_RESET:
      return updateObject(state, { product: {} })
    default:
      return state
  }
}

export const productCreateReviewReducer = (
  state = { product: {} },
  action: ProductActionTypes
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return updateObject(state, { loading: true })
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return updateObject(state, {
        loading: false,
        success: true
      })
    case PRODUCT_CREATE_REVIEW_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const topRatedProductReducer = (
  state = { products: [] },
  action: ProductActionTypes
) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return updateObject(state, { loading: true, products: [] })
    case PRODUCT_TOP_SUCCESS:
      return updateObject(state, { loading: false, products: action.payload })
    case PRODUCT_TOP_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    default:
      return state
  }
}
