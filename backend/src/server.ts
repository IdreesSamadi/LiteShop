import bodyParser from 'body-parser'
import express, { ErrorRequestHandler } from 'express'

import config from './config/config'
import connectDB from './config/db'
import logger from './config/logging'
import { notFound, errorHandler } from './middleware/errorMiddleware'
import productRouter from './routes/product.routes'

const NAMESPACE = 'Server'

connectDB()
const app = express()

/** Log the request */
app.use((req, res, next) => {
  logger.info(
    NAMESPACE,
    `[REQUEST] METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  )

  res.on('finish', () => {
    logger.info(
      NAMESPACE,
      `[RESPONSE] METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    )
  })
  next()
})

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/** Rules of API */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }

  next()
})

app.use('/api/products', productRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(config.server.port, () =>
  logger.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}:${config.environment}`
  )
)
