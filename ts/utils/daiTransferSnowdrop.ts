import { Snowdrop } from 'pollenium-snowdrop'
import { ethers } from 'ethers'
import { Address, Uint256 } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { provider } from './provider'
import { dai } from './dai'


export const daiTransferSnowdrop: Snowdrop<DaiTransfer> = new Snowdrop<DaiTransfer>()

export interface DaiTransfer {
  src: Address,
  dst: Address,
  wad: Uint256
}

const daiContract = new ethers.Contract(
  dai.uu.toPhex(),
  ['event Transfer(address indexed src, address indexed dst, uint wad)'],
  provider
)
daiContract.on('Transfer', (src: string, dst: string, wad) => {
  daiTransferSnowdrop.emit({
    src: new Address(Uu.fromHexish(src)),
    dst: new Address(Uu.fromHexish(dst)),
    wad: Uint256.fromNumberString(10, wad.toString(10))
  })
})
