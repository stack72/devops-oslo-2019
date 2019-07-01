import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { WebServer } from "./webserver";

async function main() {
    const ubuntu = await aws.getAmi({
        filters: [
            {
                name: "name",
                values: ["*ubuntu-bionic-18.04*"],
            },
            {
                name: "virtualization-type",
                values: ["hvm"],
            },
        ],
        mostRecent: true,
        owners: ["099720109477"], // Canonical
    });

    let webServers = [];
    for (let i = 0; i < 3; i++) {
        webServers.push(
            new WebServer(`web-server-${i}`,
                ubuntu.id,
                aws.ec2.InstanceTypes.T2_Micro));
    }

    return webServers.map(s => s.vm.publicDns)
}

export const ips = main();
