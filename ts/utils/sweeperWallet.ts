import { ethers } from 'ethers'
import { provider } from './provider'
import { sweeperPrivateKey } from './sweeperPrivateKey'

export const sweeperWallet = new ethers.Wallet(sweeperPrivateKey.u, provider)
