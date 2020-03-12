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
      body: Uu.wrap(data).toHex()
    })
    if (response.status !== 200) {
      await new Promise((resolve, reject) => {
        response.body.on('end', () => {
          const body = response.body.read()
          if (body) {
            const message = new Uu(body).toUtf8()
            reject(new Error(message))
          } else {
            reject(new Error(`HTTP Error: ${response.status}`))
          }
        })
      })
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
