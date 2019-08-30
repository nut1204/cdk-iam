import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import { BasePolicy } from '../policies/base-policy';

export class ReadonlyRole extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const iam_account = this.node.tryGetContext("iam_account");
    const readonly_policy_name = this.node.tryGetContext("readonly_policy_name");
    const readonly_role_name = this.node.tryGetContext("readonly_role_name");

    const role = new iam.Role(this, readonly_role_name, {
      roleName: readonly_role_name,
      assumedBy: new iam.AccountPrincipal(iam_account),
      maxSessionDuration: cdk.Duration.hours(12),
    });

    role.addManagedPolicy({
      managedPolicyArn: this.formatArn({
        service: "iam",
        region: "",
        account: this.account,
        resource: "policy",
        resourceName: readonly_policy_name
      })
    });
  }
}