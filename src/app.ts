import express, { type Application, type Request, type Response } from 'express';
import { userRouter } from './routes/userRoutes.js';
import { logger } from './middlewares/logger.js';
import { authRouter } from "./routes/authRoutes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swagger.js";
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import cors from 'cors'

export const app: Application = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
)

app.use(express.json())
app.use(logger)
app.use('/users', userRouter)
app.use("/auth", authRouter);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({status: 'ok'})
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorMiddleware)