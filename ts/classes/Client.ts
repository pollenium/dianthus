import { Uish, Uu } from 'pollenium-uvaursi'
import { PermitRequest } from './PermitRequest'
import { DepositSweepRequest } from './DepositSweepRequest'
import { RequestType } from '../RequestType'
import fetch from 'node-fetch'

export class Client {

  constructor(readonly serverUrl: string) {}

  private async post(data: Uish): Promise<void> {
    const response = await fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      body: Uu.wrap(data).u.buffer
    })
    if (response.status !== 200) {
      const body = response.body ? response.body.read() : null
      if (body) {
        const message = new Uu(body).toUtf8()
        throw new Error(message)
      }
      throw new Error(`HTTP Error: ${response.status}`)
    }

  }

  genAndUploadPermitRequest(struct: {
    holderPrivateKey: Uish,
    nonce: Uish
  }): Promise<void> {

    const request = PermitRequest.gen(struct)
    const requestEncoding = request.getEncoding()

    return this.post(
      Uu.genConcat([
        new Uint8Array([RequestType.PERMIT]),
        requestEncoding
      ])
    )

  }

  genAndUploadDepositSweepRequest(holder: Uish): Promise<void> {

    const request = new DepositSweepRequest(holder)
    const requestEncoding = request.getEncoding()

    return this.post(
      Uu.genConcat([
        new Uint8Array([RequestType.DEPOSIT_SWEEP]),
        requestEncoding
      ])
    )

  }

}
