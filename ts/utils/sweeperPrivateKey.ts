import dotenv from 'dotenv-safe'
import { Bytes32 } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'

dotenv.config()

export const sweeperPrivateKey = new Bytes32(Uu.fromHexish(process.env.SWEEPER_PRIVATE_KEY))
