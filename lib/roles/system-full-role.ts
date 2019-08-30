import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import { BasePolicy } from '../policies/base-policy';

export class SystemFullRole extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const iam_account = this.node.tryGetContext("iam_account");
    const base_policy_name = this.node.tryGetContext("base_policy_name");
    const system_full_policy_name = this.node.tryGetContext("system_full_policy_name");
    const system_full_role_name = this.node.tryGetContext("system_full_role_name");

    const role = new iam.Role(this, system_full_role_name, {
      roleName: system_full_role_name,
      assumedBy: new iam.AccountPrincipal(iam_account),
      maxSessionDuration: cdk.Duration.hours(12),
    });

    role.addManagedPolicy({
      managedPolicyArn: this.formatArn({
        service: "iam",
        region: "",
        account: this.account,
        resource: "policy",
        resourceName: base_policy_name
      })
    });

    role.addManagedPolicy({
      managedPolicyArn: this.formatArn({
        service: "iam",
        region: "",
        account: this.account,
        resource: "policy",
        resourceName: system_full_policy_name
      })
    });
  }
}