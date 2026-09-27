import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ordersRouter } from './routes/orders';
import { inventoryRouter } from './routes/inventory';
import { authRouter } from './routes/auth';
import { config } from './config';

const app = express();
const startedAt = Date.now();

app.use(cors({ origin: '*', credentials: true }));
app.use(bodyParser.json());

app.use('/orders', ordersRouter);
app.use('/inventory', inventoryRouter);
app.use('/auth', authRouter);

app.get('/health', (req, res) => {
  res.send('ok');
});

const port: number = config.port;

app.listen(port, () => {
});
