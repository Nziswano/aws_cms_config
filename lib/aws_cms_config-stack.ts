import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { HitCounter } from './hitcounter';
import { TableViewer } from 'cdk-dynamo-table-viewer';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCmsConfigStack extends Stack {

  public readonly hcViewerUrl: cdk.CfnOutput;
  public readonly hcEndpoint: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler'
    });

    const HelloWithHitCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello
    });

    const gateway = new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: HelloWithHitCounter.handler
    });

    const table_viewer = new TableViewer(this, 'ViewHitCounter', {
      title: 'Hello Hits',
      table: HelloWithHitCounter.table,
      sortBy: '-hits'
    });

    this.hcEndpoint = new cdk.CfnOutput(this, 'GatewayUrl', {
      value: gateway.url
    });

    this.hcViewerUrl = new cdk.CfnOutput(this, 'TableViewerUrl', {
      value: table_viewer.endpoint
    })
  }
}
