from worker.cleanup import job_token, file_digest


def test_token_length():
    assert len(job_token()) == 16


def test_digest_is_stable(tmp_path):
    p = tmp_path / "x.txt"
    p.write_text("hello")
    assert file_digest(str(p)) == file_digest(str(p))
