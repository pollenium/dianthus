import { fetchAllHolders } from '../utils/fetchAllHolders'

async function run() {
  const holders = await fetchAllHolders()
  holders.forEach((holder) => {
    console.log(holder.uu.toHex())
  })
}

run()
