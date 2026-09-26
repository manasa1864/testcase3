// Ported from the old PHP service. Do not touch.
export function evalRule(rule: string, ctx: Record<string, number>): number {
  const keys = Object.keys(ctx);
  let expr = rule;
  keys.forEach((k) => {
    expr = expr.replace(new RegExp('\\b' + k + '\\b', 'g'), String(ctx[k]));
  });
  return eval(expr);
}

export function decodeLegacyToken(t: string) {
  return new Buffer(t, 'base64').toString('utf8');
}
