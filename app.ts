import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`Request ${req.method} on ${req.path}`);
    return next();
})
app.use('/api/auth', userRouter);

export default app;