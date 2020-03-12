import { Uish, Uu } from 'pollenium-uvaursi'
import { SignatureStruct, Signature } from 'pollenium-ilex'
import { Address, Uintable, Uint256 } from 'pollenium-buttercup'
import { genPermitHash, genPermitStruct } from 'pollenium-dianella'
import { engine } from 'pollenium-xanthoceras'

export interface PermitRequestStruct {
  holder: Uish,
  nonce: Uintable,
  signature: SignatureStruct
}

export class PermitRequest {

  readonly holder: Address
  readonly nonce: Uint256
  readonly signature: Signature

  private encoding: Uu

  constructor(struct: PermitRequestStruct) {
    this.holder = new Address(struct.holder)
    this.nonce = new Uint256(struct.nonce)
    this.signature = new Signature(struct.signature)
  }

  getEncoding(): Uu {
    if (this.encoding) {
      return this.encoding
    }
    this.encoding = Uu.genConcat([
      this.holder,
      this.nonce,
      this.signature.getEncoding()
    ])
    return this.encoding
  }

  getIsSignatureValid(): boolean {
    const permitHash = genPermitHash({
      holder: this.holder,
      nonce: this.nonce,
      spender: engine
    })
    const signer = this.signature.getSigner(permitHash)
    return this.holder.uu.getIsEqual(signer)
  }

  static gen(struct: {
    holderPrivateKey: Uish,
    nonce: Uintable
  }): PermitRequest {
    const permitStruct = genPermitStruct({
      spender: engine,
      ...struct
    })
    return new PermitRequest(permitStruct)
  }

  static fromEncoding(encodingUish: Uish): PermitRequest {
    const encoding = Uu.wrap(encodingUish)
    return new PermitRequest({
      holder: encoding.u.slice(0, 20),
      nonce: encoding.u.slice(20, 52),
      signature: Signature.fromEncoding(encoding.u.slice(52, 117))
    })
  }

}
