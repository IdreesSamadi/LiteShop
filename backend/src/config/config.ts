import dotenv from 'dotenv'

dotenv.config()

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 1337
const NODE_ENV = process.env.NODE_ENV || 'development'
const MONGO_URI = process.env.MONGO_URI || ''

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
}

const config = {
  server: SERVER,
  environment: NODE_ENV,
  mongoURI: MONGO_URI,
}

export default config
