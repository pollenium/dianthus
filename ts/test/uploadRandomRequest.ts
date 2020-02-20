import { Uu } from 'pollenium-uvaursi'
import { PermitRequest } from '../classes/PermitRequest'
import fetch from 'node-fetch'
import { createServer } from '../utils/createServer'

const port = 4920

createServer(4920)

const holderPrivateKey = Uu.genRandom(32)
const nonce = Uu.genRandom(2)

const request = PermitRequest.gen({
  holderPrivateKey,
  nonce
})

const requestEncoding = request.getEncoding()

fetch(`http://localhost:${port}`, {
  method: 'POST',
  body: requestEncoding.u
})
