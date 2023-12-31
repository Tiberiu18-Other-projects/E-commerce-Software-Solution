import express from "express";
import productRoute from "./Routes/ProductRoutes.js";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import AIRoutes from "./Routes/AIRoutes.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());



// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/ai", AIRoutes);

// err handler
app.use(notFound);
app.use(errorHandler);




app.get("/",(req,res)=>{
    res.send("API is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running port ${PORT}...`));
