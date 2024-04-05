#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { JsAssertionCheatSheet } from '../lib/cdk-stack';

const app = new cdk.App();
<<<<<<< HEAD
new JsAssertionCheatSheet(app, 'JsAssertionCheatSheet', {
=======
new DocsSiteTemplate(app, 'JsAssertionCheatSheet', {
>>>>>>> c0b32b8 (Add main deployment first draft)
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
