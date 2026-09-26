import { useEffect, useState } from 'react';
import { fetchOrders } from '../api';

export function useOrders(customer: string): any[] {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders(customer).then((rows) => setOrders(rows));
  }, []);

  return orders;
}
