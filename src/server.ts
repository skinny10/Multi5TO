import express from "express";
import { Signale } from "signale";

import { productRouter } from "./product/infrastructure/ProductRouter";

const app = express();

const signale = new Signale();

app.use(express.json());
app.use("/products", productRouter);

app.listen(3000, () => {
  signale.success("Server online in port 3000");
});
