import mongoose from 'mongoose'

import config from './config'
import logger from './logging'

const NAMESPACE = 'db'
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(config.mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    logger.info(NAMESPACE, `Connected: ${connect.connection.host}`)
  } catch (error) {
    logger.error(NAMESPACE, `Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
