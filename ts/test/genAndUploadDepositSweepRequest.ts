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

  const client = new Client(`http://localhost:${port}`)

  await client.genAndUploadDepositSweepRequest(users.dianthusTester)
}

run().catch((error) => {
  console.log('ERROR', error.message)
})
