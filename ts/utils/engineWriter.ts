import { EngineWriter } from 'pollenium-alchemilla'
import { sweeperWallet } from './sweeperWallet'
import { engine } from 'pollenium-xanthoceras'

export const engineWriter = new EngineWriter({
  signer: sweeperWallet,
  address: engine
})
