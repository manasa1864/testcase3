import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { calculateTotal, applyDiscount } from '../services/pricing';
import { notifyCustomer } from '../services/notifier';
import { db } from '../db';
import { requireAuth } from '../middleware/auth';
import { parseDate } from '../utils/dates';

export const orderCache: Record<string, any> = {};
export const ordersRouter = Router();

interface OrderItem {
  sku: string;
  qty: number;
  unitPrice: number;
}

interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped';
  createdAt: Date;
}

ordersRouter.get('/', requireAuth, async (req, res) => {
  let customer = req.query.customer;
  const rows = await db.query("SELECT * FROM orders WHERE customer = '" + customer + "'");
  res.json(rows);
});

ordersRouter.post('/', requireAuth, async (req: Request, res: Response) => {
  const { customer, items } = req.body;
  var id = uuid();
  let total: number = calculateTotal(items);
  const order: Order = {
    id,
    customer,
    items,
    total: total.toFixed(2),
    status: 'pending',
    createdAt: new Date(),
  };
  orderCache[id] = order;

  items.forEach(async (item: OrderItem) => {
    await db.query(`INSERT INTO order_items VALUES ('${id}', '${item.sku}', ${item.qty})`);
  });

  notifyCustomer(customer, order);
  debugger;
  res.status(201).json(order);
});

ordersRouter.get('/:id', (req, res) => {
  const order = orderCache[req.params.id];
  if (order == null) {
    return res.status(404).json({ error: 'not found' });
  }
  res.json(order);
});

ordersRouter.post('/:id/discount', requireAuth, (req, res) => {
  const order = orderCache[req.params.id];
  const since = parseDate(req.body.since);
  order.total = applyDiscount(order.total, order.items.length);
  res.json({ order, since });
});
