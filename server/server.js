// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import { clerkMiddleware, requireAuth } from '@clerk/express'
// import aiRouter from './routes/aiRoutes.js';
// import connectCloudinary from './configs/cloudinary.js';
// import userRouter from './routes/userRoutes.js';



// const app=express();
// await connectCloudinary();

// app.use(cors())

// app.use(express.json())
// app.use(clerkMiddleware())

// app.use(requireAuth())
// app.use('/api/ai',aiRouter) 
// app.use('/api/user',userRouter)
// app.get('/',(req,res)=>res.send('Server is Live!'))

// const PORT = process.env.PORT || 3000;

// app.listen(PORT,()=>{
//     console.log("Server is running on PORT:",+PORT)
// })
import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";

const app = express();
await connectCloudinary();

// 🌍 Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// ✅ Clerk middleware (REQUIRED)
app.use(clerkMiddleware());

// 🟢 Health check
app.get("/", (req, res) => {
  res.send("Server is Live!");
});

// 🔐 Protect APIs with Clerk
app.use("/api/ai", requireAuth(), aiRouter);
app.use("/api/user", requireAuth(), userRouter);

// 🔊 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
