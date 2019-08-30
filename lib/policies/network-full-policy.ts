import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');

export class NetworkFullPolicy extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const document = new iam.PolicyDocument();
    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'ec2:*Tags',
        'ec2:AcceptVpcEndpointConnections',
        'ec2:AcceptVpcPeeringConnection',
        'ec2:AssociateRouteTable',
        'ec2:AssociateSubnetCidrBlock',
        'ec2:AssociateVpcCidrBlock',
        'ec2:AttachClassicLinkVpc',
        'ec2:AttachInternetGateway',
        'ec2:AttachVpnGateway',
        'ec2:CreateCustomerGateway',
        'ec2:CreateDefaultSubnet',
        'ec2:CreateDefaultVpc',
        'ec2:CreateEgressOnlyInternetGateway',
        'ec2:CreateInternetGateway',
        'ec2:CreateNatGateway',
        'ec2:CreateNetworkAcl',
        'ec2:CreateNetworkAclEntry',
        'ec2:CreateRoute',
        'ec2:CreateRouteTable',
        'ec2:CreateSubnet',
        'ec2:CreateVpc',
        'ec2:CreateVpcEndpoint',
        'ec2:CreateVpcEndpointConnectionNotification',
        'ec2:CreateVpcEndpointServiceConfiguration',
        'ec2:CreateVpcPeeringConnection',
        'ec2:CreateVpnConnection',
        'ec2:CreateVpnConnectionRoute',
        'ec2:CreateVpnGateway',
        'ec2:DeleteCustomerGateway',
        'ec2:DeleteEgressOnlyInternetGateway',
        'ec2:DeleteFlowLogs',
        'ec2:DeleteInternetGateway',
        'ec2:DeleteNatGateway',
        'ec2:DeleteNetworkAcl',
        'ec2:DeleteNetworkAclEntry',
        'ec2:DeleteRoute',
        'ec2:DeleteRouteTable',
        'ec2:DeleteSubnet',
        'ec2:DeleteVpc',
        'ec2:DeleteVpcEndpointConnectionNotifications',
        'ec2:DeleteVpcEndpoints',
        'ec2:DeleteVpcEndpointServiceConfigurations',
        'ec2:DeleteVpcPeeringConnection',
        'ec2:DeleteVpnConnection',
        'ec2:DeleteVpnConnectionRoute',
        'ec2:DeleteVpnGateway',
        'ec2:DescribeAddresses',
        'ec2:DescribeCustomerGateways',
        'ec2:DescribeEgressOnlyInternetGateways',
        'ec2:DescribeFlowLogs',
        'ec2:DescribeInternetGateways',
        'ec2:DescribeNatGateways',
        'ec2:DescribeNetworkAcls',
        'ec2:DescribeRouteTables',
        'ec2:DescribeSubnets',
        'ec2:DescribeVpcAttribute',
        'ec2:DescribeVpcClassicLink',
        'ec2:DescribeVpcClassicLinkDnsSupport',
        'ec2:DescribeVpcEndpointConnectionNotifications',
        'ec2:DescribeVpcEndpointConnections',
        'ec2:DescribeVpcEndpoints',
        'ec2:DescribeVpcEndpointServiceConfigurations',
        'ec2:DescribeVpcEndpointServicePermissions',
        'ec2:DescribeVpcEndpointServices',
        'ec2:DescribeVpcPeeringConnections',
        'ec2:DescribeVpcs',
        'ec2:DescribeVpnConnections',
        'ec2:DescribeVpnGateways',
        'ec2:DetachClassicLinkVpc',
        'ec2:DetachInternetGateway',
        'ec2:DetachVpnGateway',
        'ec2:DisableVgwRoutePropagation',
        'ec2:DisableVpcClassicLink',
        'ec2:DisableVpcClassicLinkDnsSupport',
        'ec2:DisassociateRouteTable',
        'ec2:DisassociateSubnetCidrBlock',
        'ec2:DisassociateVpcCidrBlock',
        'ec2:EnableVgwRoutePropagation',
        'ec2:EnableVpcClassicLink',
        'ec2:EnableVpcClassicLinkDnsSupport',
        'ec2:ModifySubnetAttribute',
        'ec2:ModifyVpcAttribute',
        'ec2:ModifyVpcEndpoint',
        'ec2:ModifyVpcEndpointConnectionNotification',
        'ec2:ModifyVpcEndpointServiceConfiguration',
        'ec2:ModifyVpcEndpointServicePermissions',
        'ec2:ModifyVpcPeeringConnectionOptions',
        'ec2:ModifyVpcTenancy',
        'ec2:MoveAddressToVpc',
        'ec2:RejectVpcEndpointConnections',
        'ec2:RejectVpcPeeringConnection',
        'ec2:ReplaceNetworkAclAssociation',
        'ec2:ReplaceNetworkAclEntry',
        'ec2:ReplaceRoute',
        'ec2:ReplaceRouteTableAssociation',
      ]
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'cloudfront:ListDistributions',
        'cloudwatch:DescribeAlarms',
        'cloudwatch:GetMetricStatistics',
        'elasticbeanstalk:DescribeEnvironments',
        'elasticloadbalancing:DescribeLoadBalancers',
        'lambda:*',
        'route53:*',
        'route53domains:*',
        's3:GetBucketLocation',
        's3:GetBucketWebsite',
        's3:GetBucketWebsiteConfiguration',
        's3:ListBucket',
        'sns:ListSubscriptionsByTopic',
        'sns:ListTopics',
      ]
    }));

    document.addStatements(new iam.PolicyStatement({
      resources: [
        'arn:aws:iam::*:role/flow-logs-*'
      ],
      actions: [
        'iam:GetRole',
        'iam:ListRoles',
        'iam:PassRole',
      ]
    }));

    const network_full_policy_name = this.node.tryGetContext("network_full_policy_name");
    const managedpolicy = new iam.CfnManagedPolicy(this, network_full_policy_name, {
        policyDocument: document,
        managedPolicyName: network_full_policy_name
    });
  }
}