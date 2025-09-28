import express from "express";
import dotenv from "dotenv";
import dbconnect from "./config/db.js";
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import http from 'http';
import initSocket from "./socket/socket.js";


dotenv.config();
dbconnect();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', messageRoutes);


const server = http.createServer(app);

initSocket(server);


const PORT =process.env.PORT || 5000;

server.listen(PORT,() => {
  console.log(`Server Running Successfully at PORT: ${PORT}`)
} )