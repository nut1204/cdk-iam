#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { BasePolicy } from '../lib/policies/base-policy';
import { ReadonlyPolicy } from '../lib/policies/readonly-policy';
import { DatabaseFullPolicy } from '../lib/policies/database-full-policy';
import { DevelopFullPolicy } from '../lib/policies/develop-full-policy';
import { SystemFullPolicy } from '../lib/policies/system-full-policy';
import { NetworkFullPolicy } from '../lib/policies/network-full-policy';
import { SecurityFullPolicy } from '../lib/policies/security-full-policy';

import { AdminRole } from '../lib/roles/admin-role';
import { DatabaseFullRole } from '../lib/roles/database-full-role';
import { DevelopFullRole } from '../lib/roles/develop-full-role';
import { IamRole } from '../lib/roles/iam-role';
import { NetworkFullRole } from '../lib/roles/network-full-role';
import { ReadonlyRole } from '../lib/roles/readonly-role';
import { SecurityFullRole } from '../lib/roles/security-full-role';
import { SystemFullRole } from '../lib/roles/system-full-role';

const app = new cdk.App();

new BasePolicy(app, 'BasePolicy');
new ReadonlyPolicy(app, 'ReadonlyPolicy');
new DatabaseFullPolicy(app, 'DatabaseAdminPolicy');
new DevelopFullPolicy(app, 'DevelopAdminPolicy');
new SystemFullPolicy(app, 'SystemAdminPolicy');
new NetworkFullPolicy(app, 'NetworkAdminPolicy');
new SecurityFullPolicy(app, 'SecurityAdminPolicy');

new AdminRole(app, 'AdminRole');
new DatabaseFullRole(app, 'DatabaseAdminRole');
new DevelopFullRole(app, 'DevelopAdminRole');
new IamRole(app, 'IamRole');
new NetworkFullRole(app, 'NetworkAdminRole');
new ReadonlyRole(app, 'ReadonlyRole');
new SecurityFullRole(app, 'SecurityAdminRole');
new SystemFullRole(app, 'SystemAdminRole');