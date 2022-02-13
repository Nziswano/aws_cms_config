"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsCmsConfigStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigw = require("aws-cdk-lib/aws-apigateway");
const hitcounter_1 = require("./hitcounter");
const cdk_dynamo_table_viewer_1 = require("cdk-dynamo-table-viewer");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class AwsCmsConfigStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const hello = new lambda.Function(this, 'HelloHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hello.handler'
        });
        const HelloWithHitCounter = new hitcounter_1.HitCounter(this, 'HelloHitCounter', {
            downstream: hello
        });
        new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: HelloWithHitCounter.handler
        });
        new cdk_dynamo_table_viewer_1.TableViewer(this, 'ViewHitCounter', {
            title: 'Hello Hits',
            table: HelloWithHitCounter.table,
            sortBy: '-hits'
        });
    }
}
exports.AwsCmsConfigStack = AwsCmsConfigStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzX2Ntc19jb25maWctc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhd3NfY21zX2NvbmZpZy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBZ0Q7QUFDaEQsaURBQWlEO0FBQ2pELG9EQUFvRDtBQUVwRCw2Q0FBMEM7QUFDMUMscUVBQXNEO0FBQ3RELDhDQUE4QztBQUU5QyxNQUFhLGlCQUFrQixTQUFRLG1CQUFLO0lBQzFDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDdEQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxlQUFlO1NBQ3pCLENBQUMsQ0FBQztRQUVILE1BQU0sbUJBQW1CLEdBQUcsSUFBSSx1QkFBVSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUNsRSxVQUFVLEVBQUUsS0FBSztTQUNsQixDQUFDLENBQUM7UUFFSCxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUN4QyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsT0FBTztTQUNyQyxDQUFDLENBQUM7UUFFSCxJQUFJLHFDQUFXLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3RDLEtBQUssRUFBRSxZQUFZO1lBQ25CLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxLQUFLO1lBQ2hDLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXhCRCw4Q0F3QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBhcGlndyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IEhpdENvdW50ZXIgfSBmcm9tICcuL2hpdGNvdW50ZXInO1xuaW1wb3J0IHsgVGFibGVWaWV3ZXIgfSBmcm9tICdjZGstZHluYW1vLXRhYmxlLXZpZXdlcic7XG4vLyBpbXBvcnQgKiBhcyBzcXMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNxcyc7XG5cbmV4cG9ydCBjbGFzcyBBd3NDbXNDb25maWdTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBoZWxsbyA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ0hlbGxvSGFuZGxlcicsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICAgIGhhbmRsZXI6ICdoZWxsby5oYW5kbGVyJ1xuICAgIH0pO1xuXG4gICAgY29uc3QgSGVsbG9XaXRoSGl0Q291bnRlciA9IG5ldyBIaXRDb3VudGVyKHRoaXMsICdIZWxsb0hpdENvdW50ZXInLCB7XG4gICAgICBkb3duc3RyZWFtOiBoZWxsb1xuICAgIH0pO1xuXG4gICAgbmV3IGFwaWd3LkxhbWJkYVJlc3RBcGkodGhpcywgJ0VuZHBvaW50Jywge1xuICAgICAgaGFuZGxlcjogSGVsbG9XaXRoSGl0Q291bnRlci5oYW5kbGVyXG4gICAgfSk7XG5cbiAgICBuZXcgVGFibGVWaWV3ZXIodGhpcywgJ1ZpZXdIaXRDb3VudGVyJywge1xuICAgICAgdGl0bGU6ICdIZWxsbyBIaXRzJyxcbiAgICAgIHRhYmxlOiBIZWxsb1dpdGhIaXRDb3VudGVyLnRhYmxlLFxuICAgICAgc29ydEJ5OiAnLWhpdHMnXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==