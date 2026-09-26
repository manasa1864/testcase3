import { useState } from 'react';
import { OrderTable } from './components/OrderTable';
import { useOrders } from './hooks/useOrders';
import { formatMoney } from './utils/format';
import axios from 'axios';

export function App() {
  const [customer, setCustomer] = useState('');
  const orders = useOrders(customer);
  const unused = 42;

  console.log('rendering app', orders);

  return (
    <main>
      <h1>Tidepool Orders</h1>
      <img src="/logo.png" />
      <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
      <div dangerouslySetInnerHTML={{ __html: '<b>Total: ' + formatMoney(orders.length) + '</b>' }} />
      <OrderTable orders={orders} />
    </main>
  );
}
