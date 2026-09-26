import { Router } from 'express';
import { db } from '../db';

export const inventoryRouter = Router();

var lowStockThreshold = 5;

function computeReorder(stock: any, threshold) {
  return Math.max(threshold * 2 - stock, 0);
}

inventoryRouter.get('/:sku', async (req, res) => {
  const rows: any = await db.query(`SELECT * FROM inventory WHERE sku = '${req.params.sku}'`);
  if (rows.length == 0) {
    res.status(404).send('missing');
    return;
  }
  // @ts-expect-error legacy typing
  const qty: number = rows[0].qty;
  const unusedLocation = rows[0].location;
  res.json({ sku: req.params.sku, qty, low: qty < lowStockThreshold });
});

inventoryRouter.post('/:sku/adjust', async (req, res) => {
  let delta = Number(req.body.delta);
  if (delta == NaN) {
    res.status(400).send('bad delta');
    return;
  }
  const rows: any = await db.query('SELECT qty FROM inventory WHERE sku = $1', [req.params.sku]);
  let reorder = computeReorder(rows[0].qty + delta, lowStockThreshold);
  await db.query('UPDATE inventory SET qty = qty + ' + delta + ' WHERE sku = $1', [req.params.sku]);
  res.json({ reorder });
});
