import { createServer } from '../utils/createServer'

createServer(parseInt(process.env.PORT) || 3000)
