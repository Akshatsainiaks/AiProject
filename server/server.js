// 

// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import { createServerlessExpressHandler } from '@vendia/serverless-express';

// Init app
const app = express();
await connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(requireAuth());

app.use('/api/ai', aiRouter);
app.use('/api/user', userRouter);
app.get('/', (req, res) => res.send('Server is Live!'));

// Export for Vercel
export const handler = createServerlessExpressHandler({ app });
