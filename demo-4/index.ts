import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

async function main() {
    const azs = await aws.getAvailabilityZones();

    const vpc = new awsx.ec2.Vpc("my-vpc", {
        cidrBlock: "10.0.0.0/16",
        enableDnsSupport: true,
        enableDnsHostnames: true,
        numberOfAvailabilityZones: azs.names.length,
        numberOfNatGateways: 1,
        subnets: [
            {
                type: "public",
                name: "Public",
                cidrMask: 20,
            },
            {
                type: "private",
                name: "Private",
                cidrMask: 24,
            }
        ],
    });
}

module.exports = main();
