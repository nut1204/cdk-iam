import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');

export class SystemFullPolicy extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const document = new iam.PolicyDocument();
    document.addStatements(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'aws-portal:*Billing',
        'aws-portal:*PaymentMethods',
        'aws-portal:*Usage',
        'awsbillingconsole:*Billing',
        'awsbillingconsole:*PaymentMethods',
        'awsbillingconsole:*Usage',
        'budgets:ModifyBudget',
        'budgets:ViewBudget',
        'cloudwatch:Describe*',
        'cloudwatch:GetMetricStatistics',
        'cloudwatch:ListMetrics',
        'cur:*',
        'ec2:*Image*',
        'ec2:*Snapshot*',
        'ec2:*Tag*',
        'ec2:Describe*',
      ]
    }));

    const system_full_policy_name = this.node.tryGetContext("system_full_policy_name");
    const managedpolicy = new iam.CfnManagedPolicy(this, system_full_policy_name, {
        policyDocument: document,
        managedPolicyName: system_full_policy_name
    });
  }
}
