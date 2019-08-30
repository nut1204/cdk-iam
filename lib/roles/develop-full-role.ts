import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import { BasePolicy } from '../policies/base-policy';

export class DevelopFullRole extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const iam_account = this.node.tryGetContext("iam_account");
    const base_policy_name = this.node.tryGetContext("base_policy_name");
    const develop_full_policy_name = this.node.tryGetContext("develop_full_policy_name");
    const develop_full_role_name = this.node.tryGetContext("develop_full_role_name");

    const role = new iam.Role(this, develop_full_role_name, {
      roleName: develop_full_role_name,
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
        resourceName: develop_full_policy_name
      })
    });
  }
}