import 'reflect-metadata'
import 'express-async-errors'

import express from 'express'
import http, { Server } from 'http'

import { createConnection } from './database/mongoose'
import { setupGlobalMiddlewares } from './http/setup/setupGlobalMIddlewares'
import { setupErrorHandler } from './http/setup/setupErrorHandler'
import { setupWebsocket } from './http/setup/setupWebsocket'

export async function run (): Promise<Server> {
  await createConnection()
  const app = express()
  const server = http.createServer(app)

  setupGlobalMiddlewares(app)
  // setupRoutes(app)
  setupErrorHandler(app)
  setupWebsocket(server)

  return server
}
