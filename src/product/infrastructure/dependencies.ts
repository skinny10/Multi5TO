import { CreateProductUseCase } from "../application/CreateProductUseCase";
import { GetAllProductUseCase } from "../application/GetAllProductUseCase";
import { GetByIdProductUseCase } from "../application/GetByIdProductUseCase";
import { MysqlProductRepository } from "./MysqlProductRepository";
import { Application } from "express";

export const mysqlProductRepository = new MysqlProductRepository();

export const createProductUseCase = new CreateProductUseCase(mysqlProductRepository);
export const getAllProductUseCase = new GetAllProductUseCase(mysqlProductRepository);
export const getByIdProductUseCase = new GetByIdProductUseCase(mysqlProductRepository);

export const setupDependencies = (app: Application) => {
  const io = app.get("io");

  return {
    createProductUseCase,
    getAllProductUseCase,
    getByIdProductUseCase,
    io,
  };
};
