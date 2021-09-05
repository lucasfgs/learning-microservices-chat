import { Server as HTTPServer } from 'http'
import { Server } from 'socket.io'
import { webSocketHelperSingleton } from '../helpers/WebSocket'

export const setupWebsocket = (server: HTTPServer): void => {
  const socketio = new Server()

  global.io = socketio.listen(server)
  global.io.on('connection', webSocketHelperSingleton.connection)
}
