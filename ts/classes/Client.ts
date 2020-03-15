import { Uish, Uu } from 'pollenium-uvaursi'
import { PermitRequest } from './PermitRequest'
import { RequestType } from '../RequestType'
import { Address } from 'pollenium-buttercup'
import { genActionViaSignatureStruct, GenActionViaSignatureStructStruct } from 'pollenium-alchemilla'
import { actionViaSignatureStructUtils } from '../utils/actionViaSignatureStructUtils'
import fetch from 'node-fetch'

export class Client {

  constructor(readonly serverUrl: string) { }

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

  private postRequest(requestType: RequestType, requestEncoding: Uish): Promise<void> {
    return this.post(Uu.genConcat([
      new Uint8Array([requestType]),
      requestEncoding
    ]))
  }

  genAndUploadPermitRequest(struct: {
    holderPrivateKey: Uish,
    spender: Uish,
    nonce: Uish
  }): Promise<void> {

    const request = PermitRequest.gen(struct)
    const requestEncoding = request.getEncoding()

    return this.postRequest(RequestType.PERMIT, requestEncoding)
  }

  genAndUploadDepositRequest(struct: GenActionViaSignatureStructStruct): Promise<void> {

    const actionViaSignatureStruct = genActionViaSignatureStruct(struct)
    const requestEncoding = actionViaSignatureStructUtils.toEncoding(actionViaSignatureStruct)

    return this.postRequest(RequestType.DEPOSIT, requestEncoding)

  }

  genAndUploadWithdrawRequest(struct: GenActionViaSignatureStructStruct): Promise<void> {

    const actionViaSignatureStruct = genActionViaSignatureStruct(struct)
    const requestEncoding = actionViaSignatureStructUtils.toEncoding(actionViaSignatureStruct)

    return this.postRequest(RequestType.WITHDRAW, requestEncoding)

  }

  genAndUploadWithdrawAndNotifyRequest(struct: GenActionViaSignatureStructStruct): Promise<void> {

    const actionViaSignatureStruct = genActionViaSignatureStruct(struct)
    const requestEncoding = actionViaSignatureStructUtils.toEncoding(actionViaSignatureStruct)

    return this.postRequest(RequestType.WITHDRAW_AND_NOTIFY, requestEncoding)

  }

}
