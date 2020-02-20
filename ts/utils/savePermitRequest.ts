import { fetchMysqlConnection } from './fetchMysqlConnection'
import { xanthoceras } from 'pollenium-xanthoceras'
import { PermitRequest } from '../classes/PermitRequest'

export async function savePermitRequest(permitRequest: PermitRequest) {
  const mysqlConnection = await fetchMysqlConnection()
  const results = await mysqlConnection.query('SELECT * FROM permitRequests WHERE holder = ?', [
    permitRequest.holder.u
  ])

  if (results.length === 0) {
    await mysqlConnection.query(
      'INSERT INTO permitRequests(holder, nonce, signature) VALUES(?, ?, ?)',
      [
        Buffer.from(permitRequest.holder.u),
        Buffer.from(permitRequest.nonce.u),
        Buffer.from(permitRequest.signature.getEncoding().u)
      ]
    )
  } else {
    const result = results[0]
    await mysqlConnection.query(
      'UPDATE permitRequests SET nonce = ?, signature = ? WHERE id = ?',
      [
        Buffer.from(permitRequest.nonce.u),
        Buffer.from(permitRequest.signature.getEncoding().u),
        result.id
      ]
    )
  }
}
