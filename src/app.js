import express from 'express'
import { routeNotFound } from './middlewares/error.middleware.js';
import index from './routes/index.route.js'
import cookieParser from "cookie-parser";
const app =express();
app.use(express.json());

app.use('/api',index)


app.use(routeNotFound)


export default app;