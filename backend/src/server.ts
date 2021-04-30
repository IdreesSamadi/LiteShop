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
import bodyParser from 'body-parser'
import express, { ErrorRequestHandler } from 'express'

import config from './config/config'
import connectDB from './config/db'
import logger from './config/logging'
import { notFound, errorHandler } from './middleware/errorMiddleware'
import adminRouter from './routes/admin.routes'
import configRouter from './routes/config.routes'
import orderRouter from './routes/order.routes'
import productRouter from './routes/product.routes'
import uploadRouter from './routes/upload.routes'
import userRouter from './routes/user.routes'

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
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/config', configRouter)
app.use('/api/admin', adminRouter)
app.use('/api/upload', uploadRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(config.server.port, () =>
  logger.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}:${config.environment}`
  )
)
