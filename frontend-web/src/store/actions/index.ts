import { CartActionTypes } from './cartActionTypes'
import { ProductActionTypes } from './productActionTypes'
import { UserLoginTypes } from './userActionTypes'

export type AppAction = ProductActionTypes | CartActionTypes | UserLoginTypes
