import { actionViaSignatureStructUtils } from './actionViaSignatureStructUtils'
import { ActionViaSignatureStruct } from  'pollenium-alchemilla'
import { Uu } from 'pollenium-uvaursi'
import { Address, Bytes32, Uint256, Uint8 } from 'pollenium-buttercup'

test('actionViaSignatureStructUtils', () => {

  const to = new Address(Uu.genRandom(20))
  const token = new Address(Uu.genRandom(20))
  const amount = new Uint256(Uu.genRandom(32))
  const expiration = new Uint256(Uu.genRandom(32))
  const nonce = new Bytes32(Uu.genRandom(32))
  const signature = {
    v: new Uint8(Uu.genRandom(1)),
    r: new Bytes32(Uu.genRandom(32)),
    s: new Bytes32(Uu.genRandom(32))
  }

  const encoding = actionViaSignatureStructUtils.toEncoding({
    to,
    token,
    amount,
    expiration,
    nonce,
    signature
  })

  const actionViaSignatureStruct = actionViaSignatureStructUtils.fromEncoding(encoding)

  expect(Uu.wrap(actionViaSignatureStruct.to).toHex()).toBe(to.uu.toHex())
  expect(Uu.wrap(actionViaSignatureStruct.token).toHex()).toBe(token.uu.toHex())
  expect(new Uint256(actionViaSignatureStruct.amount).uu.toHex()).toBe(amount.uu.toHex())
  expect(new Uint256(actionViaSignatureStruct.expiration).uu.toHex()).toBe(expiration.uu.toHex())
  expect(Uu.wrap(actionViaSignatureStruct.nonce).toHex()).toBe(nonce.uu.toHex())
  expect(new Uint8(actionViaSignatureStruct.signature.v).uu.toHex()).toBe(signature.v.uu.toHex())
  expect(Uu.wrap(actionViaSignatureStruct.signature.r).toHex()).toBe(signature.r.uu.toHex())
  expect(Uu.wrap(actionViaSignatureStruct.signature.s).toHex()).toBe(signature.s.uu.toHex())


})
