import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const ubunutAmi = pulumi.output(aws.getAmi({
    filters: [
        {
            name: "name",
            values: ["ubuntu-bionic-18.04*"],
        },
        {
            name: "virtualization-type",
            values: ["ebs"],
        }
    ],
    owners: ["099720109477"],
    mostRecent: true,
}));

let sshKey = new aws.ec2.KeyPair("my-keypair", {
    keyName: "devops-oslo",
    publicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD3F6tyPEFEzV0LX3X8BsXdMsQz1x2cEikKDEY0aIj41qgxMCP/iteneqXSIFZBp5vizPvaoIR3Um9xK7PGoW8giupGn+EPuxIA4cDM4vzOqOkiMPhz5XK0whEjkVzTo4+S0puvDZuwIsdiW9mxhJc7tgBNL0cYlWSYVkz4G/fslNfRPW5mYAM49f4fhtxPb5ok4Q2Lg9dPKVHO/Bgeu5woMc7RY0p1ej6D4CKFE6lymSDJpW0YHX/wqE9+cfEauh7xZcG0q9t2ta6F6fmX0agvpFyZo8aFbXeUBr7osSCJNgvavWbM/06niWrOvYX2xwWdhXmXSrbX8ZbabVohBK41 email@example.com",
}, {
    aliases: []
});

let openSg = new aws.ec2.SecurityGroup("my-security-group", {
   egress: [
       { protocol: "-1", fromPort: 0, toPort: 0, cidrBlocks: ["0.0.0.0/0"]},
   ],
   ingress: [
       { protocol: "-1", fromPort: 0, toPort: 0, cidrBlocks: ["0.0.0.0/0"]},
   ],
});

let webservers = [];
for (let i = 0; i < 3; i++) {
webservers.push(new aws.ec2.Instance(`my-instance-${i}`, {
    ami: ubunutAmi.id,
    keyName: sshKey.keyName,
    securityGroups: [openSg.name],
    tags: {
        Name: "test",
    },
    instanceType: aws.ec2.InstanceTypes.T2_Small,
}))};


export let publicDnsNames = webservers.map(s => s.publicDns);
