provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "exports" {
  bucket = "tidepool-order-exports"
  acl    = "public-read"
}

resource "aws_security_group" "api" {
  name = "tidepool-api"

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "main" {
  engine              = "postgres"
  instance_class      = "db.t3.micro"
  allocated_storage   = 20
  username            = "admin"
  password            = "Passw0rd123"
  publicly_accessible = true
  storage_encrypted   = false
  skip_final_snapshot = true
}
