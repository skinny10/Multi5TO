import { query } from "../../database/mysql";
import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";

export class MysqlProductRepository implements ProductRepository {
  async getAll(): Promise<Product[] | null> {
    const sql = "SELECT * FROM Product";
    try {
      const [data]: [any[], any] = await query(sql, []);
      const dataProducts = Object.values(JSON.parse(JSON.stringify(data)));

      return dataProducts.map(
        (product: any) =>
          new Product(
            product.id,
            product.Temperatura ?? null,
            product.Humedad ?? null,
            product.GasLP ?? null
          )
      );
    } catch (error) {
      return null;
    }
  }

  async getById(userId: number): Promise<Product | null> {
    const sql = "SELECT * FROM Product WHERE id=?";
    const params: (string | number)[] = [userId];
    try {
      const [result]: [any[], any] = await query(sql, params);
      if (result.length === 0) return null;

      return new Product(
        result[0].id,
        result[0].Temperatura ?? null,
        result[0].Humedad ?? null,
        result[0].GasLP ?? null
      );
    } catch (error) {
      return null;
    }
  }

  async createProduct(
    Temperatura: string,
    Humedad: number,
    GasLP: number
  ): Promise<Product | null> {
    const sql =
      "INSERT INTO Product (Temperatura, Humedad, GasLP) VALUES (?, ?, ?)";
    const params: (string | number)[] = [
      Temperatura,
      Humedad,
      GasLP
    ];
    try {
      const [result]: any = await query(sql, params);
      return new Product(result.insertId, Temperatura, Humedad, GasLP);
    } catch (error) {
      return null;
    }
  }
}
