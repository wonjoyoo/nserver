import {config} from 'dotenv'
config({ path: process.env.NODE_ENV_FILE || '.env' });

import 'reflect-metadata'
import http from 'http'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cron from 'node-cron'

import crypto from 'crypto'
import jwt from 'jsonwebtoken'
//import moment from 'moment-timezone'
import {Server} from 'socket.io'

import {createConnection} from 'typeorm'
import {corsOptions} from './config/config'
import {RegisterRoutes} from './routes/routes'

import swaggerUi from 'swagger-ui-express'
import swaggerJson from '../docs/swagger.json'

import {ValidateError} from 'tsoa'
import logger from './libs/logger'

import passport from 'passport'
import passportConfig from './middleware/passport'

import SlackLog from './notifications/SlackLog'
import Scheduler from './Scheduler'

const app = express()
export const server = http.createServer(app)
export const io = new Server(server, {cors: {origin: '*'}})

app.set('socketio', io)

createConnection().then(() => {
  console.log('성공적으로 데이터베이스를 연결하였습니다.')
  app.use(cors(corsOptions))

  app.use(express.urlencoded({extended: true}))
  app.use(express.json())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(passport.initialize())
  app.use(passport.session())
  RegisterRoutes(app)
  passportConfig()

  if (process.env.NODE_ENV === 'development') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
  }

  //const { createProxyMiddleware } = require('http-proxy-middleware');
  

  if (process.env.NODE_ENV === 'production') {
    const scheduler = new Scheduler(io);
  }

  app.use(function errorHandler(
    err: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): express.Response | void {
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
      return res.status(422).json({
        message: 'Validation Failed',
        details: err?.fields,
      })
    }
    if (err instanceof Error) {
      logger.error(err.message)
      return res.status(500).json({
        message: 'Internal Server Error',
      })
    }
    next()
  })

}).catch(e => {
  console.log(e);
  console.log('데이터베이스를 연결하는데 문제가 생겼습니다.' + e.toString())
})
