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
import dotenv from 'dotenv'

dotenv.config()

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.PORT || 1337
const NODE_ENV = process.env.NODE_ENV || 'development'
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
}

const config = {
  server: SERVER,
  environment: NODE_ENV,
  mongoURI: MONGO_URI
}

export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || ''
export const JWT_SECRET = process.env.JWT_SECRET || 'secretCode'
export default config
