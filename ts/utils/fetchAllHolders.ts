import { fetchMysqlConnection } from './fetchMysqlConnection'
import { Address } from 'pollenium-buttercup'

export async function fetchAllHolders(): Promise<Address[]> {
  const mysqlConnection = await fetchMysqlConnection()
  const results = mysqlConnection.query('SELECT holder FROM permitRequests')
  return results.map((result: { holder: Buffer }) => {
    return new Address(result.holder)
  })
}
