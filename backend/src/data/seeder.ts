import connectBD from '../config/db'
import logger from '../config/logging'
import Order from '../models/order.model'
import Product from '../models/product.model'
import Review from '../models/review.model'
import User from '../models/user.model'
import products from './products'
import UsersData from './users'

connectBD()
const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Review.deleteMany()

    const createdUsers: any = await User.insertMany(UsersData)
    const adminUser = createdUsers[0]._id

    const sampleProducts: any = products.map((p) => {
      return { ...p, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    logger.info('SEEDER', `DataImported`)
    process.exit()
  } catch (error) {
    logger.error('SEEDER', `Error: ${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Review.deleteMany()

    logger.info('SEEDER', `DataDestroyed`)
    process.exit()
  } catch (error) {
    logger.error('SEEDER', `Error: ${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
