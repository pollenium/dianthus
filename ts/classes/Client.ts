import { Uish, Uu } from 'pollenium-uvaursi'
import { PermitRequest } from './PermitRequest'
import { DepositSweepRequest } from './DepositSweepRequest'
import { RequestType } from '../RequestType'
import fetch from 'node-fetch'

export class Client {

  constructor(readonly serverUrl: string) {}

  genAndUploadPermitRequest(struct: {
    holderPrivateKey: Uish,
    nonce: Uish
  }) {

    const request = PermitRequest.gen(struct)
    const requestEncoding = request.getEncoding()

    return fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      body: Uu.genConcat([
        new Uint8Array([RequestType.PERMIT]),
        requestEncoding
      ]).u
    })

  }

  genAndUploadDepositSweepRequest(holder: Uish): Uu {

    const request = new DepositSweepRequest(holder)
    const requestEncoding = request.getEncoding()

    return fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      body: Uu.genConcat([
        new Uint8Array([RequestType.DEPOSIT_SWEEP]),
        requestEncoding
      ]).u
    })

  }

}
