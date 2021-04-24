import { Document, Types } from 'mongoose'

import IProduct from './product.interface'
import IUser from './user.interface'

interface OrderItem {
  name: string
  qty: Number
  image: string
  price: Number
  product: ID | IProduct
}

interface ShippingAddress {
  address: string
  city: string
  postalCode: string
  country: string
}
interface PaymentResult {
  id: string
  status: string
  update_time: string
  email_address: string
}
type ID = Types.ObjectId

interface IOrder extends Document {
  user: ID | IUser
  orderItems: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  paymentResult: PaymentResult
  taxPrice: number
  shippingPrice: number
  totalPrice: number
  isPaid: boolean
  paidAt: Date
  isDelivered: boolean
  DeliveredAt: Date
}

export default IOrder
