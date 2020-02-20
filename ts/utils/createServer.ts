import { createServer as createHttpServer } from 'http'
import { PermitRequest } from '../classes/PermitRequest'
import { Address } from 'pollenium-buttercup'
import { savePermitRequest } from './savePermitRequest'

export function createServer(port: number) {
  createHttpServer((request, response) => {
    request.on('data', async (encoding) => {
      try {
        const permitRequest = PermitRequest.fromEncoding(encoding)

        if (!permitRequest.getIsSignatureValid()) {
          throw new Error('Invalid signature')
        }

        savePermitRequest(permitRequest)

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
