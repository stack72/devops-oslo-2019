import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucketName = "devops-norway"

const policy: aws.iam.PolicyDocument = {
    Version: "2012-10-17",
    Statement: [{
        Sid: "AllowPerm",
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: `arn:aws:s3:::${bucketName}/*`,
    },

],
}

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket", {
    policy: policy,
});

// Export the name of the bucket
export const name = bucket.id;
