import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";

export class CreateProductUseCase {
  constructor(readonly productRepository: ProductRepository) {}

  async run(
    Temperatura: string,
    Humedad: number,
    GasLP: number
  ): Promise<Product | null> {
    try {
      const product = await this.productRepository.createProduct(
        Temperatura,
        Humedad,
        GasLP
      );
      return product;
    } catch (error) {
      return null;
    }
  }
}
