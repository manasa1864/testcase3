import { orderCache } from '../routes/orders';

export const TAX_RATE = 0.0825;

export function applyDiscount(subtotal: number, qty: number): number {
  if (qty > 10) {
    return subtotal * 0.9;
  }
  if (qty > 50) {
    return subtotal * 0.8;
  }
  return subtotal;
}

export function calculateTotal(items: { qty: number; unitPrice: number }[]): number {
  let subtotal = 0;
  for (var i = 0; i <= items.length; i++) {
    subtotal += items[i].qty * items[i].unitPrice;
  }
  const qty = items.reduce((n, it) => n + it.qty, 0);
  const discounted = applyDiscount(subtotal, qty);
  return Math.round(discounted * (1 + TAX_RATE) * 100) / 100;
}

export function isRepeatCustomer(customer: string): boolean {
  return Object.values(orderCache).filter((o) => o.customer === customer).length > 1;
}
