import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');

export class DatabaseFullPolicy extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const document = new iam.PolicyDocument();
    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'application-autoscaling:DeleteScalingPolicy',
        'application-autoscaling:DeregisterScalableTarget',
        'application-autoscaling:Describe*',
        'application-autoscaling:PutScalingPolicy',
        'application-autoscaling:RegisterScalableTarget',
        'athena:*',
        'cloudwatch:DeleteAlarms',
        'cloudwatch:DescribeAlarmHistory',
        'cloudwatch:DescribeAlarms',
        'cloudwatch:DescribeAlarmsForMetric',
        'cloudwatch:GetMetricStatistics',
        'cloudwatch:ListMetrics',
        'cloudwatch:PutMetricAlarm',
        'ec2:DescribeAccountAttributes',
        'ec2:DescribeAvailabilityZones',
        'ec2:DescribeInternetGateways',
        'ec2:DescribeSecurityGroups',
        'ec2:DescribeSubnets',
        'ec2:DescribeVpcAttribute',
        'ec2:DescribeVpcs',
        'logs:DescribeLogStreams',
        'logs:GetLogEvents',
        'rds:*',
        'redshift:*',
        'secretsmanager:*',
      ]
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'cloudwatch:GetMetricStatistics',
        'cloudwatch:ListMetrics',
        'datapipeline:ActivatePipeline',
        'datapipeline:CreatePipeline',
        'datapipeline:Describe*',
        'datapipeline:GetPipelineDefinition',
        'datapipeline:ListPipelines',
        'datapipeline:PutPipelineDefinition',
        'datapipeline:QueryObjects',
        'dax:*',
        'dms:*',
        'dynamodb:*',
        'ec2:DescribeSecurityGroups',
        'ec2:DescribeSubnets',
        'ec2:DescribeVpcs',
        'elasticache:*',
        'iam:GetRole',
        'iam:ListRoles',
        'kms:ListAliases',
        'kms:ListKeyPolicies',
        'kms:ListKeys',
        'kms:ListRetirableGrants',
        'lambda:CreateEventSourceMapping',
        'lambda:CreateFunction',
        'lambda:GetFunctionConfiguration',
        'lambda:ListEventSourceMappings',
        'lambda:ListFunctions',
        'logs:DescribeLogStreams',
        'logs:GetLogEvents',
        'sns:CreateTopic',
        'sns:DeleteTopic',
        'sns:ListSubscriptions',
        'sns:ListSubscriptionsByTopic',
        'sns:ListTopics',
        'sns:Publish',
        'sns:SetTopicAttributes',
        'sns:Subscribe',
        'sns:Unsubscribe',
      ]
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'cloudformation:CancelUpdateStack',
        'cloudformation:ContinueUpdateRollback',
        'cloudformation:Create*',
        'cloudformation:Describe*',
        'cloudformation:EstimateTemplateCost',
        'cloudformation:ExecuteChangeSet',
        'cloudformation:Get*',
        'cloudformation:List*',
        'cloudformation:SetStackPolicy',
        'cloudformation:SignalResource',
        'cloudformation:StopStackSetOperation',
        'cloudformation:Update*',
        'cloudformation:ValidateTemplate',
      ]
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: ['arn:aws:pi:*:*:metrics/rds/*'],
      actions: [
        'pi:*'
      ]
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'iam:PassRole'
      ],
      conditions: {'StringLike': {'iam:PassedToService': [
        'application-autoscaling.amazonaws.com',
        'dax.amazonaws.com',
      ]}}
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: [
        'arn:aws:iam::*:role/DataPipelineDefaultResourceRole',
        'arn:aws:iam::*:role/DataPipelineDefaultRole',
        'arn:aws:iam::*:role/lambda-dynamodb-*',
        'arn:aws:iam::*:role/lambda-vpc-execution-role',
        'arn:aws:iam::*:role/lambda_exec_role',
        'arn:aws:iam::*:role/rdbms-lambda-access',
        'arn:aws:iam::*:role/rds-monitoring-role',
      ],
      actions: [
        'iam:GetRole',
        'iam:PassRole',
      ]
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'iam:CreateServiceLinkedRole'
      ],
      conditions: {'StringLike': {'iam:AWSServiceName': [
        'dax.amazonaws.com',
        'dynamodb.application-autoscaling.amazonaws.com',
        'rds.amazonaws.com',
        'rds.application-autoscaling.amazonaws.com',
        'replication.dynamodb.amazonaws.com',
        'elasticache.amazonaws.com',
      ]}}
    }));

    const database_full_policy_name = this.node.tryGetContext("database_full_policy_name");
    const managedpolicy = new iam.CfnManagedPolicy(this, database_full_policy_name, {
        policyDocument: document,
        managedPolicyName: database_full_policy_name
    });
  }
}