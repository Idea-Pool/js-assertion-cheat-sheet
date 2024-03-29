#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { JsAssertionCheatSheet } from '../lib/cdk-stack';

const STACK_NAME_MAX_LENGTH = 128;
const DEFAULT_STACK_NAME = 'JsAssertionCheatSheet';

const app = new cdk.App();
const branchId = app.node.tryGetContext('branch_id');
const branchSuffix = branchId ? `-${branchId}` : '';
const stackName = `${DEFAULT_STACK_NAME}${branchSuffix}`.slice(0, STACK_NAME_MAX_LENGTH);

new JsAssertionCheatSheet(app, stackName, {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
