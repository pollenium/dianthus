import { createServer as createHttpServer } from 'http'
import { RequestType } from '../RequestType'
import { handlePermitEncoding } from './server/handlePermitEncoding'
import { handleDepositSweepEncoding } from './server/handleDepositSweepEncoding'

export function createServer(port: number) {
  createHttpServer((request, response) => {
    request.on('data', async (encoding) => {

      response.setHeader('Access-Control-Allow-Origin', '*');
    	response.setHeader('Access-Control-Request-Method', '*');
    	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    	response.setHeader('Access-Control-Allow-Headers', '*');
      response.setHeader('Content-Type', 'application/octet-stream')
    	if (request.method === 'OPTIONS') {
    		response.writeHead(200);
    		response.end();
    		return;
    	}


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
      } catch(error) {
        console.log(error)
        response.write(error.message)
        response.writeHead(500)
        response.end()
      }
    })
  }).listen(port)
}
