import { Uish, Uu } from 'pollenium-uvaursi'
import { SignatureStruct, Signature } from 'pollenium-ilex'
import { Address, Uintable, Uint256 } from 'pollenium-buttercup'
import { genPermitHash, genPermitStruct } from 'pollenium-dianella'
import { engine } from 'pollenium-xanthoceras'

export class DepositSweepRequest {

  readonly holder: Address

  private encoding: Uu

  constructor(holder: Uish) {
    this.holder = new Address(holder)
  }

  getEncoding(): Uu {
    if (this.encoding) {
      return this.encoding
    }
    this.encoding = this.holder.uu
    return this.encoding
  }

  static fromEncoding(encodingUish: Uish): DepositSweepRequest {
    return new DepositSweepRequest(encodingUish)
  }

}
