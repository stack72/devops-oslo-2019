### Demo 6

As per this repo https://github.com/pulumi/examples/tree/master/azure-ts-appservice-devops


### Demo 7

As per this repo https://github.com/pulumi/examples/tree/master/aws-ts-serverless-raw


### Demo 9

Using https://github.com/pulumi/tf2pulumi/tree/master/tests/terraform/aws/asg

* pulumi new typescript --dir sample-conversion
* tf2pulumi >sample-conversion/index.ts
* cd sample-conversion/
* npm i @pulumi/aws
* pulumi config set aws:region us-east-1
* cp ../userdata.sh .
* pulumi preview 

