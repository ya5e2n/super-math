from aws_cdk import Stack, aws_s3 as s3
from constructs import Construct


class InfraStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        bucket_name = "justmathgames.com"

        site_bucket = s3.Bucket.from_bucket_name(
            self, "StaticSiteBucket", bucket_name=bucket_name
        )
