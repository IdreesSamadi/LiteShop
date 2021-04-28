import { ErrorRequestHandler, RequestHandler } from 'express'

import config from '../config/config'

const notFound: RequestHandler = (req, res, next) => {
  const error = new Error('Page Not Found')
  res.status(404)
  next(error)
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: config.environment === 'production' ? null : err.stack
  })
}

export { notFound, errorHandler }
