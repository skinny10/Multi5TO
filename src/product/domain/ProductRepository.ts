import { Product } from "./Product";

export interface ProductRepository {
  getAll(): Promise<Product[] | null>;
  getById(userId: number): Promise<Product | null>;
  createProduct(Temperatura: string, Humedad: number, GasLP: number): Promise<Product | null>;
}
