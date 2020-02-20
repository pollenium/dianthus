import { DaishReader } from 'pollenium-dianella'
import { provider } from './provider'
import { dai } from './dai'

export const daishReader = new DaishReader({
  address: dai,
  provider
})
