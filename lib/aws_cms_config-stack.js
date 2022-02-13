"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsCmsConfigStack = void 0;
const cdk = require("aws-cdk-lib");
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
        const gateway = new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: HelloWithHitCounter.handler
        });
        const table_viewer = new cdk_dynamo_table_viewer_1.TableViewer(this, 'ViewHitCounter', {
            title: 'Hello Hits',
            table: HelloWithHitCounter.table,
            sortBy: '-hits'
        });
        this.hcEndpoint = new cdk.CfnOutput(this, 'GatewayUrl', {
            value: gateway.url
        });
        this.hcViewerUrl = new cdk.CfnOutput(this, 'TableViewerUrl', {
            value: table_viewer.endpoint
        });
    }
}
exports.AwsCmsConfigStack = AwsCmsConfigStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzX2Ntc19jb25maWctc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhd3NfY21zX2NvbmZpZy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsNkNBQWdEO0FBQ2hELGlEQUFpRDtBQUNqRCxvREFBb0Q7QUFFcEQsNkNBQTBDO0FBQzFDLHFFQUFzRDtBQUN0RCw4Q0FBOEM7QUFFOUMsTUFBYSxpQkFBa0IsU0FBUSxtQkFBSztJQUsxQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3RELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsZUFBZTtTQUN6QixDQUFDLENBQUM7UUFFSCxNQUFNLG1CQUFtQixHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDbEUsVUFBVSxFQUFFLEtBQUs7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDeEQsT0FBTyxFQUFFLG1CQUFtQixDQUFDLE9BQU87U0FDckMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsSUFBSSxxQ0FBVyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUMzRCxLQUFLLEVBQUUsWUFBWTtZQUNuQixLQUFLLEVBQUUsbUJBQW1CLENBQUMsS0FBSztZQUNoQyxNQUFNLEVBQUUsT0FBTztTQUNoQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3RELEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRztTQUNuQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDM0QsS0FBSyxFQUFFLFlBQVksQ0FBQyxRQUFRO1NBQzdCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQXBDRCw4Q0FvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBhcGlndyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IEhpdENvdW50ZXIgfSBmcm9tICcuL2hpdGNvdW50ZXInO1xuaW1wb3J0IHsgVGFibGVWaWV3ZXIgfSBmcm9tICdjZGstZHluYW1vLXRhYmxlLXZpZXdlcic7XG4vLyBpbXBvcnQgKiBhcyBzcXMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNxcyc7XG5cbmV4cG9ydCBjbGFzcyBBd3NDbXNDb25maWdTdGFjayBleHRlbmRzIFN0YWNrIHtcblxuICBwdWJsaWMgcmVhZG9ubHkgaGNWaWV3ZXJVcmw6IGNkay5DZm5PdXRwdXQ7XG4gIHB1YmxpYyByZWFkb25seSBoY0VuZHBvaW50OiBjZGsuQ2ZuT3V0cHV0O1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgaGVsbG8gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdIZWxsb0hhbmRsZXInLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gICAgICBoYW5kbGVyOiAnaGVsbG8uaGFuZGxlcidcbiAgICB9KTtcblxuICAgIGNvbnN0IEhlbGxvV2l0aEhpdENvdW50ZXIgPSBuZXcgSGl0Q291bnRlcih0aGlzLCAnSGVsbG9IaXRDb3VudGVyJywge1xuICAgICAgZG93bnN0cmVhbTogaGVsbG9cbiAgICB9KTtcblxuICAgIGNvbnN0IGdhdGV3YXkgPSBuZXcgYXBpZ3cuTGFtYmRhUmVzdEFwaSh0aGlzLCAnRW5kcG9pbnQnLCB7XG4gICAgICBoYW5kbGVyOiBIZWxsb1dpdGhIaXRDb3VudGVyLmhhbmRsZXJcbiAgICB9KTtcblxuICAgIGNvbnN0IHRhYmxlX3ZpZXdlciA9IG5ldyBUYWJsZVZpZXdlcih0aGlzLCAnVmlld0hpdENvdW50ZXInLCB7XG4gICAgICB0aXRsZTogJ0hlbGxvIEhpdHMnLFxuICAgICAgdGFibGU6IEhlbGxvV2l0aEhpdENvdW50ZXIudGFibGUsXG4gICAgICBzb3J0Qnk6ICctaGl0cydcbiAgICB9KTtcblxuICAgIHRoaXMuaGNFbmRwb2ludCA9IG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdHYXRld2F5VXJsJywge1xuICAgICAgdmFsdWU6IGdhdGV3YXkudXJsXG4gICAgfSk7XG5cbiAgICB0aGlzLmhjVmlld2VyVXJsID0gbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ1RhYmxlVmlld2VyVXJsJywge1xuICAgICAgdmFsdWU6IHRhYmxlX3ZpZXdlci5lbmRwb2ludFxuICAgIH0pXG4gIH1cbn1cbiJdfQ==