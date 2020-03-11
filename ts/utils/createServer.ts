import { createServer as createHttpServer } from 'http'
import { RequestType } from '../RequestType'
import { handlePermitEncoding } from './server/handlePermitEncoding'
import { handleDepositSweepEncoding } from './server/handleDepositSweepEncoding'

export function createServer(port: number) {
  createHttpServer((request, response) => {
    request.on('data', async (encoding) => {
      try {
        const requestType = encoding[0]
        const nextEncoding = encoding.slice(1)
        switch (requestType) {
          case RequestType.PERMIT:
            await handlePermitEncoding(nextEncoding)
            break;
          case RequestType.DEPOSIT_SWEEP:
            await handleDepositSweepEncoding(nextEncoding)
            break;
          default:
            throw new Error(`Unknown request type: ${requestType}`)
            break;
        }
        response.writeHead(200)
        response.end()
      } catch(err) {
        console.log(err)
        response.writeHead(500)
        response.end()
      }
    })
  }).listen(port)
}
