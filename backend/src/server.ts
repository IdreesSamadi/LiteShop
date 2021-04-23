import bodyParser from 'body-parser'
import express from 'express'

import config from './config/config'
import connectDB from './config/db'
import logger from './config/logging'
import productRouter from './routes/product'

const NAMESPACE = 'Server'

connectDB()
const app = express()

/** Log the request */
app.use((req, res, next) => {
  logger.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  )

  res.on('finish', () => {
    /** Log the res */
    logger.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
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

app.use('/api', productRouter)

app.listen(config.server.port, () =>
  logger.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}:${config.environment}`
  )
)
