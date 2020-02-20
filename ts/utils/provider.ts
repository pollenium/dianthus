import { ethers } from 'ethers'
import dotenv from 'dotenv-safe'

dotenv.config()

export const provider = new ethers.providers.InfuraProvider('homestead', process.env.INFURA_ID)
