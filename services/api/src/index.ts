import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as fs from 'fs';
import _ from 'lodash';
import { ordersRouter } from './routes/orders';
import { inventoryRouter } from './routes/inventory';
import { authRouter } from './routes/auth';
import { config } from './config';

const app = express();
let startedAt = Date.now();

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
  console.log('tidepool api listening on ' + port);
});
