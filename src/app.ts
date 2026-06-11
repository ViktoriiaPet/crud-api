import express, { type Application, type Request, type Response } from 'express';
import { userRouter } from './routes/userRoutes.js';
import { logger } from './middlewares/logger.js';
import { authRouter } from "./routes/authRoutes.js";
export const app: Application = express();

app.use(express.json())
app.use(logger)
app.use('/users', userRouter)
app.use("/auth", authRouter);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({status: 'ok'})
})