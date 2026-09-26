from worker.jobs.report import build_report, top_customers


def test_report_counts_orders():
    orders = [{"customer": "a", "total": 10.0}, {"customer": "b", "total": 5.5}]
    result = build_report(orders)
    assert result["count"] == 2


def test_report_totals_per_customer():
    orders = [{"customer": "a", "total": 10.0}, {"customer": "a", "total": 5.0}]
    result = build_report(orders)
    assert "a,15.0" in result["lines"]


def test_top_customers():
    assert top_customers({"a": 1, "b": 9, "c": 4}, 2) == [("b", 9), ("c", 4)]
