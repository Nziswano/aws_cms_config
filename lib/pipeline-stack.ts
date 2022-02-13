import * as cdk from 'aws-cdk-lib';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { Construct } from 'constructs';
import { WorkshopPipelineStage } from './pipeline-stage';
import { CodeBuildStep, CodePipeline, CodePipelineSource } from 'aws-cdk-lib/pipelines'

export class WorkshopPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repo = new codecommit.Repository(this, 'WorkshopRepo', {
        repositoryName: 'WorkshopRepo'
    });

    const pipeline = new CodePipeline(this, 'Pipeline', {
        pipelineName: 'WorkshopPipeline',
        synth: new CodeBuildStep('SynthStep', {
                input: CodePipelineSource.codeCommit(repo, 'aws-cdk-workshop'),
                installCommands: [
                    'npm install -g aws-cdk',
                ],
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ]
            }
        )
    });

    const deploy = new WorkshopPipelineStage(this, 'Deploy');
    const deployStage = pipeline.addStage(deploy);

    deployStage.addPost(
        new CodeBuildStep('TestViewerEndpoint', {
            projectName: 'TestViewerEndpoint',
            envFromCfnOutputs: {
                ENDPOINT_URL: deploy.hcViewerUrl
            },
            commands: [
                'curl -Ssf $ENDPOINT_URL'
            ]
        }),

        new CodeBuildStep('TestAPIGatewayEndpoint', {
            projectName: 'TestAPIGatewayEndpoint',
            envFromCfnOutputs: {
                ENDPOINT_URL: deploy.hcEndpoint
            },
            commands: [
                'curl -Ssf $ENDPOINT_URL',
                'curl -Ssf $ENDPOINT_URL/hello',
                'cur -Ssf $ENDPOINT_URL/test'
            ]
        })
    )
  }
}