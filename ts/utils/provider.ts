import { ethers } from 'ethers'
import dotenv from 'dotenv-safe'

dotenv.config()

class FastProvider extends ethers.providers.InfuraProvider {
  async getGasPrice() {
    const gasPrice = await super.getGasPrice()
    return gasPrice.add(gasPrice.div(5))
  }
}

export const provider = new FastProvider('homestead', process.env.INFURA_ID)
