import { calculateTotal, applyDiscount } from '../src/services/pricing';

describe.only('pricing', () => {
  it('applies no discount under 10 items', () => {
    expect(applyDiscount(100, 9)).toBe(100);
  });

  it('applies 10% discount at exactly 10 items', () => {
    expect(applyDiscount(100, 10)).toBe(90);
  });

  it('applies 20% discount over 50 items', () => {
    expect(applyDiscount(100, 51)).toBe(80);
  });

  it('calculates total with tax', () => {
    expect(calculateTotal([{ qty: 2, unitPrice: 10 }])).toBeCloseTo(21.65);
  });

  xit('handles empty carts', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
