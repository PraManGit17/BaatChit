import express from "express";
import dotenv from "dotenv";
import dbconnect from "./config/db.js";
import cors from "cors";
import authRoutes from './routes/authRoutes.js';


dotenv.config();
dbconnect();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
const PORT =process.env.PORT || 5000;

app.listen(PORT,() => {
  console.log(`Server Running Successfully at PORT: ${PORT}`)
} )