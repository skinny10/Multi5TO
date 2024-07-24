import dotenv from "dotenv";
import mysql, { Pool, PoolConnection, RowDataPacket } from "mysql2/promise";
import { Signale } from "signale";

dotenv.config();
const signale = new Signale();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
};

// Crear el pool de conexiones
const pool: Pool = mysql.createPool(config);

export async function query(sql: string, params: (string | number)[]): Promise<[RowDataPacket[], any]> {
  try {
    const conn: PoolConnection = await pool.getConnection();
    signale.success("Conexión exitosa a la BD");
    const result = await conn.execute<RowDataPacket[]>(sql, params);
    conn.release();
    return result;
  } catch (error) {
    signale.error(error);
    throw error;
  }
}
