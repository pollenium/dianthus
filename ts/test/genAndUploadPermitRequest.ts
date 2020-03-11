import { Uu } from 'pollenium-uvaursi'
import { PermitRequest } from '../classes/PermitRequest'
import fetch from 'node-fetch'
import { createServer } from '../utils/createServer'
import { daishReader } from '../utils/daishReader'
import { users, utils } from 'pollenium-xeranthemum'
import { Client } from '../'

const port = 4920

createServer(port)

async function run() {

  const dianthusTesterKeypair = await utils.promptComputeKeypair()
  if (!dianthusTesterKeypair.getAddress().uu.getIsEqual(users.dianthusTester)) {
    throw new Error('Not dianthusTester')
  }
  const nonce = await daishReader.fetchNonce(users.dianthusTester)

  const client = new Client(`http://localhost:${port}`)

  await client.genAndUploadPermitRequest({
    holderPrivateKey: dianthusTesterKeypair.privateKey,
    nonce
  })
}

run()
