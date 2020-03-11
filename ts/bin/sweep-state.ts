import { users } from 'pollenium-xeranthemum'
import { daishReader } from '../utils/daishReader'
import { engineReader } from '../utils/engineReader'
import { dai } from 'pollenium-xanthoceras'

async function run() {

  console.log('dianthusTester', users.dianthusTester.toHex())

  const daiBalance = await daishReader.fetchBalance(users.dianthusTester)
  console.log('dai balance', daiBalance.toNumberString(10))

  const engineDaiBalance = await engineReader.fetchBalance({
    holder: users.dianthusTester,
    token: dai
  })
  console.log('engine dai balance', engineDaiBalance.toNumberString(10))

}

run()
