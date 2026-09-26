# Tidepool

Order and inventory platform: a Node API, a Python worker and a React dashboard.

## Requirements

- Node 14
- Python 3.6
- Docker 19+

## Quick start

```bash
cd api && npm install && npm start
cd worker && pip install -r requirements.txt && python main.py
cd web && yarn && yarn dev
```

## Layout

- `api/` - Express service (orders, inventory, auth)
- `worker/` - report and cleanup jobs
- `web/` - dashboard
