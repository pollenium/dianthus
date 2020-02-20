import mysql from 'promise-mysql'
import dotenv from 'dotenv-safe'

dotenv.config()

let mysqlConnectionPromise: Promise<mysql.Connection>

export function fetchMysqlConnection(): Promise<mysql.Connection>  {
  if (mysqlConnectionPromise) {
    return mysqlConnectionPromise
  }
  mysqlConnectionPromise = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  })
  return mysqlConnectionPromise
}
