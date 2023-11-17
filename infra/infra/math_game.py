from aws_cdk import (
    Stack,
    aws_s3 as s3
)
from constructs import Construct

import subprocess


class MathGame(Stack):
    def __init__(
            self,
            scope: Construct,
            construct_id: str,
            s3_bucket_name: str,
            **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        site_bucket = s3.Bucket.from_bucket_name(
            self, "StaticSiteBucket", bucket_name=s3_bucket_name
        )

        print("Syncing files to S3 bucket...")
        subprocess.run(
            f"aws s3 sync ../src/ s3://{s3_bucket_name}", shell=True)
