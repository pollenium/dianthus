import { ethers } from 'ethers'
import dotenv from 'dotenv-safe'

dotenv.config()

class FastProvider extends ethers.providers.InfuraProvider {
  async getGasPrice() {
    const gasPrice = await super.getGasPrice()
    const highGasPrice = gasPrice.mul(1.2)
    return highGasPrice.sub(highGasPrice.mod(1))
  }
}

export const provider = new FastProvider('homestead', process.env.INFURA_ID)
