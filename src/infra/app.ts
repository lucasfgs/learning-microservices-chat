import 'reflect-metadata'
import 'express-async-errors'

import express from 'express'
import http, { Server } from 'http'

import { createConnection } from './database/mongoose'
import { setupGlobalMiddlewares } from './protocols/http/setup/setupGlobalMIddlewares'
import { setupErrorHandler } from './protocols/http/setup/setupErrorHandler'
import { setupWebsocket } from './protocols/http/setup/setupWebsocket'
import { setupRoutes } from './protocols/http/setup/setupRoutes'

export async function run (): Promise<Server> {
  await createConnection()
  const app = express()
  const server = http.createServer(app)

  setupGlobalMiddlewares(app)
  setupRoutes(app)
  setupErrorHandler(app)
  setupWebsocket(server)

  return server
}
