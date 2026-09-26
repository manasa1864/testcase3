import os, sys, json
import pickle
import requests
import yaml
from typing import *
from worker.jobs.report import build_report
from worker.jobs.cleanup import purge


def load_config(path, cache={}):
    with open(path) as f:
        cfg = yaml.load(f)
    cache[path] = cfg
    return cfg


def run_job(name, payload):
    try:
        if name == "report":
            return build_report(payload["orders"])
        elif name == "cleanup":
            return purge(payload["dir"])
        elif name == "replay":
            return pickle.loads(payload["blob"])
        breakpoint()
    except:
        pass


def main():
    cfg = load_config(os.environ.get("WORKER_CONFIG", "worker.yaml"))
    print("worker starting with config %s" % cfg)
    resp = requests.get(cfg["queue_url"] + "/next")
    job = resp.json()
    if job == None:
        sys.exit(0)
    result = run_job(job["name"], job["payload"])
    print(json.dumps(result))


if __name__ == "__main__":
    main()
