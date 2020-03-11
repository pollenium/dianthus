import { DaishWriter } from 'pollenium-dianella'
import { sweeperWallet } from './sweeperWallet'
import { dai } from 'pollenium-xanthoceras'

export const daishWriter = new DaishWriter({
  signer: sweeperWallet,
  address: dai
})
