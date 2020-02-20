import { fetchMysqlConnection } from './fetchMysqlConnection'
import { PermitRequest } from '../classes/PermitRequest'
import { Address } from 'pollenium-buttercup'
import { Signature } from 'pollenium-ilex'

export async function fetchPermitRequest(holder: Address): Promise<PermitRequest | null> {
  const mysqlConnection = await fetchMysqlConnection()
  const results = await mysqlConnection.query(
    'SELECT * from permitRequests WHERE holder = ? LIMIT 1',
    [Buffer.from(holder.u)]
  )
  if (results.length === 0) {
    return null
  }
  const result = results[0]
  return new PermitRequest({
    holder,
    nonce: result.nonce,
    signature: Signature.fromEncoding(result.signature)
  })
}
