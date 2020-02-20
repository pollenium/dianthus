import { savePermitRequest } from '../utils/savePermitRequest'
import { PermitRequest } from '../classes/PermitRequest'
import { Uu } from 'pollenium-uvaursi'
import { Keypair } from 'pollenium-ilex'
import { daishReader } from '../utils/daishReader'
import { promptComputePrivateKey } from 'pollenium-xeranthemum'

async function run() {

  const holderPrivateKey = await promptComputePrivateKey()
  const holderKeypair = new Keypair(holderPrivateKey)

  const nonce = await daishReader.fetchNonce(holderKeypair.getAddress())

  console.log('address', holderKeypair.getAddress().uu.toHex())
  console.log('nonce', nonce.toNumberString(10))

  const permitRequest = PermitRequest.gen({
    holderPrivateKey,
    nonce
  })

  await savePermitRequest(permitRequest)
  process.exit()
}

run()
