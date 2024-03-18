import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfrontOrigin from 'aws-cdk-lib/aws-cloudfront-origins';

export class DocsSiteTemplate extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'WebsiteBucket', {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, 'WebsiteCloudfrontOAI');

    bucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [bucket.arnForObjects('*')],
      principals: [new iam.CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
    }));

    const cfFunction = new cloudfront.Function(this, 'Function', {
      code: cloudfront.FunctionCode.fromInline(`function handler(event, context, callback) {
    var request = event.request;
    var olduri = request.uri;
    if (!/\\.[^\\.]+$/.test(request.uri)) {
        if (!/\\/$/.test(request.uri)) {
            olduri = olduri + '/';
        }
        var newuri = olduri.replace(/\\/$/, '\\/index.html');
        console.log("Old URI: " + olduri);
        console.log("New URI: " + newuri);
        request.uri = newuri;
    }
    return request;
};`),
    });

    const distribution = new cloudfront.Distribution(this, 'WebsiteDistribution', {
      defaultRootObject: 'index.html',
      defaultBehavior:{
        origin: new cloudfrontOrigin.S3Origin(bucket, {
          originAccessIdentity: cloudfrontOAI,
        }),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [{
          function: cfFunction,
          eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
        }],
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: '/error.html',
          ttl: cdk.Duration.minutes(30),
        }
      ],
    });

    new cdk.CfnOutput(this, 'BucketName', {
      value: bucket.bucketName,
      description: 'The name of the S3 Bucket'
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
      description: 'The ID of the CloudFront distribution'
    });

    new cdk.CfnOutput(this, 'WebsiteUrl', {
      value: `https://${distribution.domainName}`,
      description: 'The URL of the CloudFront distribution'
    });
  }
}
