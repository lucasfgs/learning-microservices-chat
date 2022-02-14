import { run } from './infra/app'

(async () => {
  const server = await run()
  server.listen(process.env.SERVER_PORT)
  console.log('asoidjasoidj')
  server.on('listening', () => console.log(`Server listening at test port ${process.env.SERVER_PORT}`))
})()
