import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');

export class BasePolicy extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const document = new iam.PolicyDocument();
    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'iam:AddRoleToInstanceProfile',
        'iam:AttachRolePolicy',
        'iam:CreateInstanceProfile',
        'iam:DetachRolePolicy',
        'iam:GenerateServiceLastAccessedDetails',
        'iam:Get*',
        'iam:List*',
      ]
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'iam:PassRole',
        'iam:CreateServiceLinkedRole',
      ],
      conditions: {'StringLike': {'iam:PassedToService': [
        'application-autoscaling.amazonaws.com',
        'autoscaling.amazonaws.com',
        'dax.amazonaws.com',
        'dynamodb.application-autoscaling.amazonaws.com',
        'ec2scheduled.amazonaws.com',
        'ecs-tasks.amazonaws.com',
        'ecs.amazonaws.com',
        'ecs.application-autoscaling.amazonaws.com',
        'elasticache.amazonaws.com',
        'elasticloadbalancing.amazonaws.com',
        'elasticmapreduce.amazonaws.com',
        'replication.dynamodb.amazonaws.com',
        'spot.amazonaws.com',
        'spotfleet.amazonaws.com',
        'transitgateway.amazonaws.com',
      ]}}
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: [
          'arn:aws:iam::*:user/${aws:username}'
      ],
      actions: [
        'iam:*LoginProfile',
        'iam:*AccessKey*',
        'iam:*SSHPublicKey*',
      ]
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'iam:ListAccount*',
        'iam:GetAccountSummary',
        'iam:GetAccountPasswordPolicy',
        'iam:ListUsers',
      ]
    }));

    const base_policy_name = this.node.tryGetContext("base_policy_name");
    const managedpolicy = new iam.CfnManagedPolicy(this, base_policy_name, {
        policyDocument: document,
        managedPolicyName: base_policy_name
    });
  }
}