import { Address } from 'pollenium-buttercup'
import { daishReader } from '../daishReader'
import { daishWriter } from '../daishWriter'
import { engine, dai } from 'pollenium-xanthoceras'
import { engineWriter } from '../engineWriter'
import { actionViaSignatureStructUtils } from '../actionViaSignatureStructUtils'


export async function handleDepositEncoding(encoding) {
  const actionViaSignatureStruct = actionViaSignatureStructUtils.fromEncoding(encoding)
  await engineWriter.depositViaSignature(actionViaSignatureStruct)
}

export async function handleWithdrawEncoding(encoding) {
  const actionViaSignatureStruct = actionViaSignatureStructUtils.fromEncoding(encoding)
  await engineWriter.withdrawViaSignature(actionViaSignatureStruct)
}

export async function handleWithdrawAndNotifyEncoding(encoding) {
  const actionViaSignatureStruct = actionViaSignatureStructUtils.fromEncoding(encoding)
  await engineWriter.withdrawAndNotifyViaSignature(actionViaSignatureStruct)
}
