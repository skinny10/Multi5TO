import express, { Request, Response, NextFunction } from "express";
import { setupDependencies } from "./dependencies";

// Extiende la interfaz Request para incluir dependencies
declare global {
  namespace Express {
    interface Request {
      dependencies: any; // son de tipo anyyyy
    }
  }
}

export const productRouter = express.Router();

productRouter.use((req: Request, res: Response, next: NextFunction) => {
  req.dependencies = setupDependencies(req.app);
  next();
});

productRouter.get("/", async (req: Request, res: Response) => {
  const { getAllUseCase } = req.dependencies;
  const products = await getAllUseCase.run();
  res.json(products);
});

productRouter.get("/:id", async (req: Request, res: Response) => {
  const { getByIdProductUseCase } = req.dependencies;
  const product = await getByIdProductUseCase.run(Number(req.params.id));
  res.json(product);
});

productRouter.post("/", async (req: Request, res: Response) => {
  const { createProductUseCase, io } = req.dependencies;
  const { Temperatura, Humedad, GasLP } = req.body;
  const product = await createProductUseCase.run(Temperatura, Humedad, GasLP);

  if (product) {
    io.emit("new_product", product);
    res.status(201).json(product);
  } else {
    res.status(500).send("Error creating product");
  }
});