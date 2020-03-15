import { Uish, Uu } from 'pollenium-uvaursi'
import { SignatureStruct, Signature } from 'pollenium-ilex'
import { Address, Uintable, Uint256 } from 'pollenium-buttercup'
import { genPermitHash, genPermitStruct } from 'pollenium-dianella'

export interface PermitRequestStruct {
  holder: Uish,
  spender: Uish,
  nonce: Uintable,
  signature: SignatureStruct
}

export class PermitRequest {

  readonly holder: Address
  readonly spender: Address
  readonly nonce: Uint256
  readonly signature: Signature

  private encoding: Uu

  constructor(struct: PermitRequestStruct) {
    this.holder = new Address(struct.holder)
    this.spender = new Address(struct.spender)
    this.nonce = new Uint256(struct.nonce)
    this.signature = new Signature(struct.signature)
  }

  getEncoding(): Uu {
    if (this.encoding) {
      return this.encoding
    }
    this.encoding = Uu.genConcat([
      this.holder,
      this.spender,
      this.nonce,
      this.signature.getEncoding()
    ])
    return this.encoding
  }

  getIsSignatureValid(): boolean {
    const permitHash = genPermitHash({
      holder: this.holder,
      nonce: this.nonce,
      spender: this.spender
    })
    const signer = this.signature.getSigner(permitHash)
    return this.holder.uu.getIsEqual(signer)
  }

  static gen(struct: {
    holderPrivateKey: Uish,
    spender: Uish,
    nonce: Uintable
  }): PermitRequest {
    const permitStruct = genPermitStruct(struct)
    return new PermitRequest(permitStruct)
  }

  static fromEncoding(encodingUish: Uish): PermitRequest {
    const encoding = Uu.wrap(encodingUish)
    return new PermitRequest({
      holder: encoding.u.slice(0, 20),
      spender: encoding.u.slice(20, 40),
      nonce: encoding.u.slice(40, 72),
      signature: Signature.fromEncoding(encoding.u.slice(72, 137))
    })
  }

}
