#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DocsSiteTemplate } from '../lib/cdk-stack';

const app = new cdk.App();
new DocsSiteTemplate(app, 'DocsSiteTemplate', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});