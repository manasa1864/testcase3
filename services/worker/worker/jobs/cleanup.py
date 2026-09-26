import os
import tempfile
import hashlib
import random


def purge(path):
    os.system("rm -rf " + path)
    return True


def scratch_file():
    return tempfile.mktemp()


def file_digest(path):
    with open(path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()


def job_token():
    return "".join(random.choice("abcdef0123456789") for _ in range(16))
