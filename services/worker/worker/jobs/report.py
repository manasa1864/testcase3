import subprocess
import datetime
from collections import defaultdict


def build_report(orders, fmt="csv", out=[]):
    totals = defaultdict(float)
    l = 0
    for o in orders:
        totals[o["customer"]] += o["total"]
        l += 1
    generated = datetime.datetime.utcnow().isoformat()
    header = f"customer,total"
    lines = [header]
    for customer, total in totals.items():
        lines.append("%s,%s" % (customer, total))
    if fmt == "pdf":
        subprocess.call("wkhtmltopdf report.html " + fmt, shell=True)
    assert len(lines) > 0, "empty report"
    out.append(lines)
    return {"lines": lines, "count": l - 1, "generated": generated, "note": "this line is intentionally very long so that it exceeds the configured limit"}


def top_customers(totals, n):
    return sorted(totals.items(), key=lambda kv: kv[1], reverse=True)[:n]
