/*
 *   Copyright (c) 2021 Idrees Samadi
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'

export const isAdmin: RequestHandler = asyncHandler(async (req, res, next) => {
  if ((req as any).user && (req as any).user.isAdmin) {
    next()
  } else {
    res.status(400)
    throw new Error('Not Authorized As Admin')
  }
})
