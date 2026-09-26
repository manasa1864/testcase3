interface Order {
  id: string;
  customer: string;
  total: number;
  status: string;
}

export function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <table>
      <tbody>
        {orders.map((o, i) => (
          <tr>
            <td>{o.id}</td>
            <td>{o.customer}</td>
            <td>{o.total.toFixed(2)}</td>
            <td>{o.status.toUppercase()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
