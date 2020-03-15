import { Uu } from 'pollenium-uvaursi'
import { PermitRequest } from '../classes/PermitRequest'
import fetch from 'node-fetch'
import { createServer } from '../utils/createServer'
import { daishReader } from '../utils/daishReader'
import { engineReader } from '../utils/engineReader'
import { users, utils } from 'pollenium-xeranthemum'
import { dai } from 'pollenium-xanthoceras'
import { Client } from '../'

const port = 4920

createServer(port)

async function run() {

  const dianthusTesterKeypair = await utils.promptComputeKeypair()
  if (!dianthusTesterKeypair.getAddress().uu.getIsEqual(users.dianthusTester)) {
    throw new Error('Not dianthusTester')
  }

  const client = new Client(`http://localhost:${port}`)

  await client.genAndUploadDepositRequest({
    fromPrivateKey: dianthusTesterKeypair.privateKey,
    to: users.dianthusTester,
    nonce: Uu.genRandom(32),
    token: dai,
    amount: await daishReader.fetchBalance(users.dianthusTester),
    expiration: Math.floor((new Date().getTime()) / 1000) + 30,
    actionSalt: await engineReader.fetchDepositSalt()
  })
}

run().catch((error) => {
  console.log('ERROR', error.message)
})
