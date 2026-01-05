import express, { type Application, type Request, type Response } from 'express';
import { userRouter } from './routes/userRoutes.js';
export const app: Application = express();

app.use(express.json())

app.use('/users', userRouter)

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({status: 'ok'})
})