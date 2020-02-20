"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var promise_mysql_1 = __importDefault(require("promise-mysql"));
var dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1["default"].config();
var mysqlConnectionPromise;
function fetchMysqlConnection() {
    if (mysqlConnectionPromise) {
        return mysqlConnectionPromise;
    }
    mysqlConnectionPromise = promise_mysql_1["default"].createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });
    return mysqlConnectionPromise;
}
exports.fetchMysqlConnection = fetchMysqlConnection;
