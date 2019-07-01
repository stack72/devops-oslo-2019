import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create a bucket and a function to log all new object created events
const bucket = new aws.s3.Bucket("b");
const subscription = bucket.onObjectCreated("newObject", async (ev) => {
    console.log(JSON.stringify(ev));
});

// Create a CloudWatch Dashobard for our functions invocations
const dashboardName = "funcDashboard";
const dashboard = new awsx.cloudwatch.Dashboard(dashboardName, {
    widgets: [
        new awsx.cloudwatch.LineGraphMetricWidget({
            title: "Lambda invocations",
            width: 14,
            metrics: awsx.lambda.metrics.invocations({
                function: subscription.func,
                statistic: "Sum",
                period: 60,
            }),
        }),
    ],
});

// Export the URL of the dashboard in the AWS console
export const dashboardUrl =
    `https://${aws.config.region}.console.aws.amazon.com/cloudwatch/home?` +
    `region=${aws.config.region}#dashboards:name=${dashboardName}`;
