import { DaishWriter } from 'pollenium-dianella'
import { sweeperWallet } from './sweeperWallet'
import { dai } from './dai'

export const daishWriter = new DaishWriter({
  signer: sweeperWallet,
  address: dai
})
