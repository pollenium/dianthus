import { DepositSweepRequest } from '../../classes/DepositSweepRequest'
import { Address } from 'pollenium-buttercup'
import { daishReader } from '../daishReader'
import { daishWriter } from '../daishWriter'
import { engine, dai } from 'pollenium-xanthoceras'
import { engineWriter } from '../engineWriter'

const lastDepositSweepAtByHolderHex:{ [holderHex: string]: number } = {}
const cooldown = 1 * 60 * 1000

export async function handleDepositSweepEncoding(encoding) {
  const depositSweepRequest = DepositSweepRequest.fromEncoding(encoding)

  const balance = await daishReader.fetchBalance(depositSweepRequest.holder)

  if (balance.compEq(0)) {
    throw new Error('Dai balance is 0')
  }

  const allowance = await daishReader.fetchAllowance({
    holder: depositSweepRequest.holder,
    spender: engine
  })

  if (allowance.compEq(0)) {
    throw new Error('Not permitted')
  }

  const holderHex = depositSweepRequest.holder.uu.toHex()
  const lastDepositSweepAt = lastDepositSweepAtByHolderHex[depositSweepRequest.holder.uu.toHex()]

  if (lastDepositSweepAtByHolderHex[holderHex] !== null) {
    const ellapsed = new Date().getTime() - lastDepositSweepAt
    if (ellapsed < cooldown) {
      throw new Error(`Deposit sweeped ${ellapsed} ago`)
    }
  }

  const sweepAmount = balance.compLt(allowance) ? balance : allowance

  await engineWriter.depositViaSweep({
    toAndFrom: depositSweepRequest.holder,
    token: dai
  })

  lastDepositSweepAtByHolderHex[holderHex] = new Date().getTime()
}
