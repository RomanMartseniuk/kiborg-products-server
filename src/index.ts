const express = require("express");
import type { Request, Response } from "express";
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/status", (req: Request, res: Response) => {
  res.send('Server is running...')
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on 0.0.0.0:3000");
});
