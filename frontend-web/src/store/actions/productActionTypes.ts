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

export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL'

export const PRODUCT_DELETE_REQUEST = 'PRODUCT_DELETE_REQUEST'
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS'
export const PRODUCT_DELETE_FAIL = 'PRODUCT_DELETE_FAIL'

export interface ProductListRequestAction {
  type: typeof PRODUCT_LIST_REQUEST
}

export interface ProductListSuccessAction {
  type: typeof PRODUCT_LIST_SUCCESS
  payload: IProduct[]
}

export interface ProductListFailAction {
  type: typeof PRODUCT_LIST_FAIL
  payload: string
}

export interface ProductDetailsRequestAction {
  type: typeof PRODUCT_DETAILS_REQUEST
}

export interface ProductDetailsSuccessAction {
  type: typeof PRODUCT_DETAILS_SUCCESS
  payload: IProduct
}

export interface ProductDetailsFailAction {
  type: typeof PRODUCT_DETAILS_FAIL
  payload: string
}

export interface ProductDeleteRequestAction {
  type: typeof PRODUCT_DELETE_REQUEST
}

export interface ProductDeleteSuccessAction {
  type: typeof PRODUCT_DELETE_SUCCESS
}

export interface ProductDeleteFailAction {
  type: typeof PRODUCT_DELETE_FAIL
  payload: string
}

export type ProductActionTypes =
  | ProductListRequestAction
  | ProductListSuccessAction
  | ProductListFailAction
  | ProductDetailsRequestAction
  | ProductDetailsSuccessAction
  | ProductDetailsFailAction
  | ProductDeleteRequestAction
  | ProductDeleteSuccessAction
  | ProductDeleteFailAction
