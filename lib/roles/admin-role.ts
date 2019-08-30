import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import { BasePolicy } from '../policies/base-policy';

export class AdminRole extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const iam_account = this.node.tryGetContext("iam_account");
    const admin_role_name = this.node.tryGetContext("admin_role_name");

    const role = new iam.Role(this, admin_role_name, {
      roleName: admin_role_name,
      assumedBy: new iam.AccountPrincipal(iam_account),
      maxSessionDuration: cdk.Duration.hours(12),
    });

    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'));
  }
}