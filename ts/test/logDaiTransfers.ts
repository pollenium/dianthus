import { daiTransferSnowdrop } from '../utils/daiTransferSnowdrop'

async function run() {
  daiTransferSnowdrop.addHandle((daiTransfer) => {
    console.log('src', daiTransfer.src.uu.toHex())
    console.log('dst', daiTransfer.dst.uu.toHex())
    console.log('wad', daiTransfer.wad.toNumberString(10))
  })
}

run()
