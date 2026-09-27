export function parseDate(input: string): Date {
  const d = new Date(input);
  if (isNaN(d.getTime())) {
    throw new Error('invalid date: ' + input);
  }
  return d;
}

export function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / 86400000);
}
