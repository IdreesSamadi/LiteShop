import IProduct from '../../Models/product'

export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL'

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

export type ProductActionTypes =
  | ProductListRequestAction
  | ProductListSuccessAction
  | ProductListFailAction
  | ProductDetailsRequestAction
  | ProductDetailsSuccessAction
  | ProductDetailsFailAction
