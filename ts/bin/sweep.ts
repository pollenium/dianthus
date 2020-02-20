import { daiTransferSnowdrop } from '../utils/daiTransferSnowdrop'
import { fetchPermitRequest } from '../utils/fetchPermitRequest'
import { Address } from 'pollenium-buttercup'
import { engine } from '../utils/engine'
import { dai } from '../utils/dai'
import { daishReader } from '../utils/daishReader'
import { daishWriter } from '../utils/daishWriter'
import { engineWriter } from '../utils/engineWriter'
import { provider } from '../utils/provider'

const MIN_DEPOSIT = 1
const nullAddress = Address.genNull()

console.log('=== S W E E P ===')

daiTransferSnowdrop.addHandle(async (daiTransfer) => {
  const { dst } = daiTransfer

  if (dst.uu.getIsEqual(nullAddress)) {
    return
  }


  const permitRequest = await fetchPermitRequest(dst)

  if (!permitRequest) {
    return
  }

  console.log('================')
  console.log('dst', dst.uu.toHex())

  const balance = await daishReader.fetchBalance(dst)
  console.log('balance', balance.toNumberString(10))

  if (balance.compLt(MIN_DEPOSIT)) {
    console.log('below min deposit')
    return
  }

  const allowance = await daishReader.fetchAllowance({
    holder: dst,
    spender: engine
  })
  console.log('allowance', allowance.toNumberString(10))

  if (allowance.compLt(balance)) {
    console.log('balance lt allowance')
    const nonce = await daishReader.fetchNonce(dst)
    console.log('nonce', nonce.toNumberString(10))
    if (nonce.uu.getIsEqual(permitRequest.nonce)) {
      console.log('permit')
      const { transactionHash } = await daishWriter.permit({
        ...permitRequest,
        spender: engine
      })
      await provider.waitForTransaction(transactionHash.uu.toHex())
    }
  }

  console.log('deposit via sweep')
  await engineWriter.depositViaSweep({
    toAndFrom: dst,
    token: dai
  })

})
