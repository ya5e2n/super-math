from aws_cdk import Stack, aws_s3 as s3, aws_s3_deployment as s3_deploy
from constructs import Construct


class InfraStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        bucket_name = "testing.justmathgames.com"

        site_bucket = s3.Bucket.from_bucket_name(
            self, "StaticSiteBucket", bucket_name=bucket_name
        )

        s3_deploy.BucketDeployment(
            self,
            "BucketDeploy",
            destination_bucket=site_bucket,
            sources=[s3_deploy.Source.asset(path="../src")],
        )
