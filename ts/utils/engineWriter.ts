import { EngineWriter } from 'pollenium-alchemilla'
import { sweeperWallet } from './sweeperWallet'
import { engine } from './engine'

export const engineWriter = new EngineWriter({
  signer: sweeperWallet,
  address: engine
})
