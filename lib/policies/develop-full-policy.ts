import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');

export class DevelopFullPolicy extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const document = new iam.PolicyDocument();
    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'autoscaling:*',
        'cloudformation:CreateStack',
        'cloudformation:DescribeStackEvents',
        'cloudwatch:*',
        'codecommit:*',
        'datapipeline:Describe*',
        'datapipeline:GetPipelineDefinition',
        'datapipeline:ListPipelines',
        'datapipeline:QueryObjects',
        'dynamodb:*',
        'ec2:CancelSpotFleetRequests',
        'ec2:CancelSpotInstanceRequests',
        'ec2:CreateTags',
        'ec2:DeleteTags',
        'ec2:Describe*',
        'ec2:ModifyImageAttribute',
        'ec2:ModifyInstanceAttribute',
        'ec2:ModifySpotFleetRequest',
        'ec2:RequestSpotFleet',
        'ec2:RequestSpotInstances',
        'elasticfilesystem:*',
        'elasticmapreduce:*',
        'es:*',
        'firehose:*',
        'iam:GetInstanceProfile',
        'iam:GetPolicy',
        'iam:GetPolicyVersion',
        'iam:GetRole',
        'iam:ListRoles',
        'kinesis:*',
        'kms:List*',
        'lambda:Create*',
        'lambda:Delete*',
        'lambda:Get*',
        'lambda:InvokeFunction',
        'lambda:List*',
        'lambda:PublishVersion',
        'lambda:Update*',
        'logs:DescribeLogStreams',
        'logs:GetLogEvents',
        'machinelearning:*',
        'rds:*',
        'redshift:*',
        's3:CreateBucket',
        'sagemaker:*',
        'sdb:*',
        'sns:CreateTopic',
        'sns:Get*',
        'sns:List*',
        'sns:ListSubscriptions',
        'sns:ListTopics',
      ]
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        's3:Abort*',
        's3:DeleteObject',
        's3:Get*',
        's3:List*',
        's3:PutAccelerateConfiguration',
        's3:PutBucketLogging',
        's3:PutBucketNotification',
        's3:PutBucketTagging',
        's3:PutObject',
        's3:Replicate*',
        's3:RestoreObject',
      ]
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'ec2:RunInstances',
        'ec2:TerminateInstances',
      ]
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: [
        'arn:aws:iam::*:role/DataPipelineDefaultRole',
        'arn:aws:iam::*:role/DataPipelineDefaultResourceRole',
        'arn:aws:iam::*:role/EMR_EC2_DefaultRole',
        'arn:aws:iam::*:role/EMR_DefaultRole',
        'arn:aws:iam::*:role/kinesis-*',
      ],
      actions: [
        'iam:PassRole',
      ]
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'iam:PassRole',
      ],
      conditions: {'StringEquals': {'iam:PassedToService': [
        'sagemaker.amazonaws.com',
      ]}}
    }));

    const develop_full_policy_name = this.node.tryGetContext("develop_full_policy_name");
    const managedpolicy = new iam.CfnManagedPolicy(this, develop_full_policy_name, {
        policyDocument: document,
        managedPolicyName: develop_full_policy_name
    });
  }
}