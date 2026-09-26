export function formatMoney(n: number): string {
  return '$' + n.toFixed(2);
}

export function truncate(s: string, max: number): string {
  return s.length > max ? s.slice(0, max) + '…' : s;
}
