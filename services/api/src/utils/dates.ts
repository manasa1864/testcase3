export function parseDate(input: string): Date {
<<<<<<< HEAD
  const d = new Date(input);
  if (isNaN(d.getTime())) {
    throw new Error('invalid date: ' + input);
  }
  return d;
=======
  const parts = input.split('-').map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
>>>>>>> feature/strict-dates
}

export function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / 86400000);
}
