import { PermitRequest } from '../../classes/PermitRequest'
import { Address } from 'pollenium-buttercup'
import { daishReader } from '../daishReader'
import { daishWriter } from '../daishWriter'
import { engine } from 'pollenium-xanthoceras'

const lastPermittedAtByHolderHex:{ [holderHex: string]: number } = {}
const cooldown = 5 * 60 * 1000

export async function handlePermitEncoding(encoding) {
  const permitRequest = PermitRequest.fromEncoding(encoding)

  if (!permitRequest.getIsSignatureValid()) {
    throw new Error('Invalid signature')
  }

  const balance = await daishReader.fetchBalance(permitRequest.holder)

  if (balance.compEq(0)) {
    throw new Error('Dai balance is 0')
  }

  const allowance = await daishReader.fetchAllowance({
    holder: permitRequest.holder,
    spender: engine
  })

  if (allowance.compGt(0)) {
    throw new Error('Already permitted')
  }

  const holderHex = permitRequest.holder.uu.toHex()
  const lastPermittedAt = lastPermittedAtByHolderHex[permitRequest.holder.uu.toHex()]

  if (lastPermittedAtByHolderHex[holderHex] !== null) {
    const ellapsed = new Date().getTime() - lastPermittedAt
    if (ellapsed < cooldown) {
      throw new Error(`Permitted ${ellapsed} ago`)
    }
  }

  await daishWriter.permit({
    ...permitRequest,
    spender: engine
  })

  lastPermittedAtByHolderHex[holderHex] = new Date().getTime()
}
