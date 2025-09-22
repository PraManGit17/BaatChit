import express from "express";
import dotenv from "dotenv";
import dbconnect from "./config/db.js";
import cors from "cors";

dotenv.config();
dbconnect();

const app = express();
app.use(cors);
app.use(express.json());

const PORT =process.env.PORT;

app.listen(PORT,() => {
  console.log(`Server Running Successfully at PORT: ${PORT}`)
} )