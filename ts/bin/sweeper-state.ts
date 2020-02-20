import { sweeperPrivateKey } from '../utils/sweeperPrivateKey'
import { Keypair } from 'pollenium-ilex'

const sweeperKeypair = new Keypair(sweeperPrivateKey)
console.log('sweeper', sweeperKeypair.getAddress().uu.toHex())
