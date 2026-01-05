import express, { type Application, type Request, type Response } from 'express';

export const app: Application = express();

app.use(express.json())

app.get('health', (req: Request, res: Response) => {
    res.status(200).json({status: 'ok'})
})