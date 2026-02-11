import cors from 'cors';
import express from 'express';

import type { Request, Response } from "express";
import { initDB } from './database/db';
import { updateLists } from "./utils/updateLists";
import { getViewCategories } from "./utils/getViewCategories";
import { ProductRepository } from "./database/ProductsRepository ";
import { Product } from "./types/Product";

initDB();
// add updateLists();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: 'http://localhost:5173', // дозволяємо фронт локально
  credentials: true,               // якщо потрібні куки
}));

app.get("/update", async (req: Request, res: Response) => {
  res.send(updateLists());
});

app.get("/status", (req: Request, res: Response) => {
  res.send('Server is running...')
});

app.get("/get/categories", async (req: Request, res: Response) => {
  const data = await getViewCategories();
  const resData = data.map(({ productCategoriesList, ...rest }) => rest);
  res.send(resData);
});

app.get("/get/products", async (req: Request, res: Response) => {
  const { productId, categoryId, vendorFilter } = req.query;

  if (productId) {
    const data = ProductRepository.getById(productId as string);
    res.send(data);
  }

  if (categoryId) {
    const categories = await getViewCategories()
    const category = categories.find(cat => cat.id === +categoryId);

    if (!category) res.send(400);

    let list: Product[] = [];

    category?.productCategoriesList.forEach(el => {
      const data = ProductRepository.getByCategory(el);
      list = [...list, ...data]
    })

    if(!vendorFilter) res.send(list);

    const filteredList = list.filter(item => item.vendor===vendorFilter);

    res.send(filteredList)
  }

  res.status(400).send("productId or categoryId is required");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on 0.0.0.0:3000");
});
