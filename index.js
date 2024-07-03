import express from "express";
import authRoutes from './routes/auth_routes.js'
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
import cors from 'cors';
import stockRoutes from './routes/stock_routes.js';


const app = express();
dotenv.config();

//connecting database
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO).then(()=>{
 console.log("Database connected")
})

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//as/dlkasdas
app.use('/api/auth',authRoutes);
app.use('/api/stock',stockRoutes);

//running server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});