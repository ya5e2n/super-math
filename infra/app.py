#!/usr/bin/env python3
import os

import aws_cdk as cdk

from infra.math_game import MathGame


app = cdk.App()
MathGame(
    app,
    "MathGameTestingSite",
    s3_bucket_name="testing.justmathgames.com"
)

app.synth()
