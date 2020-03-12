import { createServer as createHttpServer } from 'http'
import { RequestType } from '../RequestType'
import { handlePermitEncoding } from './server/handlePermitEncoding'
import { handleDepositSweepEncoding } from './server/handleDepositSweepEncoding'
import { Uu } from 'pollenium-uvaursi'

export function createServer(port: number) {
  createHttpServer(async (request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (request.method === 'OPTIONS') {
      await response.writeHead(200);
      response.end();
      return;
    }


    request.on('data', async (encodingHexU) => {

      try {
        const encodingHex = new Uu(encodingHexU).toUtf8()
        const encoding = Uu.fromHexish(encodingHex).u
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
        await response.writeHead(500)
        await response.write(error.message)
        response.end()
      }
    })
  }).listen(port)
}
