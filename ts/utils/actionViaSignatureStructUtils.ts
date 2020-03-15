import { ActionViaSignatureStruct } from 'pollenium-alchemilla'
import { Uu, Uish } from 'pollenium-uvaursi'
import { Signature } from 'pollenium-ilex'
import { Uint256, Address, Bytes32 } from 'pollenium-buttercup'

export namespace actionViaSignatureStructUtils {

  export function toEncoding(
    struct: ActionViaSignatureStruct
  ): Uu {
    return Uu.genConcat([
      struct.to,
      struct.token,
      new Uint256(struct.amount),
      new Uint256(struct.expiration),
      struct.nonce,
      new Signature(struct.signature).getEncoding()
    ])
  }

  export function fromEncoding(
    encodingUish: Uish
  ): ActionViaSignatureStruct {
    const encoding = Uu.wrap(encodingUish)
    return {
      to: new Address(encoding.u.slice(0, 20)),
      token: new Address(encoding.u.slice(20, 40)),
      amount: new Uint256(encoding.u.slice(40, 72)),
      expiration: new Uint256(encoding.u.slice(72, 104)),
      nonce: new Uint256(encoding.u.slice(104, 136)),
      signature: Signature.fromEncoding(encoding.u.slice(136, 201))
    }
  }

}
