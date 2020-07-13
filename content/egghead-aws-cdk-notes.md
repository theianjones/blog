---
title: Build an App with AWS Cloud Development Kit
tags: [egghead, aws]
---

These are my notes for Tomasz egghead course.

### Table of Contents

1.  [Podcast](/build-an-app-with-aws-cloud-development-kit#org538806f)
2.  [Lessons](/build-an-app-with-aws-cloud-development-kit#org2fc32fe)
    1.  [Install AWS Cloud Development Kit (CDK) and create a new project](/build-an-app-with-aws-cloud-development-kit#orgc200104)
    2.  [Build and deploy a sample AWS Cloud Development Kit stack to AWS](/build-an-app-with-aws-cloud-development-kit#org1aa0639)
    3.  [Review an AWS CloudFormation stack deployed with AWS CDK](/build-an-app-with-aws-cloud-development-kit#org105438e)
    4.  [Clear an initial AWS CDK stack to start building an app from scratch](/build-an-app-with-aws-cloud-development-kit#orgdb433dd)
    5.  [Create and deploy a lambda function with AWS CDK](/build-an-app-with-aws-cloud-development-kit#org2d55ea5)
    6.  [Review and execute a lambda function deployed with CDK in AWS Console](/build-an-app-with-aws-cloud-development-kit#orgc1cb745)
    7.  [Change the properties of a lambda function deployed with AWS CDK](/build-an-app-with-aws-cloud-development-kit#org67a178d)
    8.  [Attach an API Gateway to a lambda function deployed with AWS CDK](/build-an-app-with-aws-cloud-development-kit#orgb06fd19)
    9.  [Pass environment variables to a lambda function deployed with AWS CDK](/build-an-app-with-aws-cloud-development-kit#org4caa786)
    10. [Run lambda functions built with CDK locally using AWS SAM](/build-an-app-with-aws-cloud-development-kit#org8f3bca0)
    11. [Create and deploy an S3 bucket with AWS CDK](/build-an-app-with-aws-cloud-development-kit#org505b4b7)
    12. [Make the contents of an S3 bucket deployed with CDK public](/build-an-app-with-aws-cloud-development-kit#org2afaa05)
    13. [Create an S3 event notification to trigger a lambda function on file upload](/build-an-app-with-aws-cloud-development-kit#org60b9d27)
    14. [Use a bucket deployment to upload a file to S3 when deploying a CDK stack](/build-an-app-with-aws-cloud-development-kit#orgee0fd50)
    15. [Create a custom AWS CDK construct](/build-an-app-with-aws-cloud-development-kit#orgfa3460d)
    16. [Create a DynamoDB table with AWS CDK](/build-an-app-with-aws-cloud-development-kit#org8df9217)
    17. [Get all items from a DynamoDB table deployed with CDK using DocumentClient API](/build-an-app-with-aws-cloud-development-kit#org86c3775)
    18. [Debug permission issues and allow a lambda function to access data from a DynamoDB table](/build-an-app-with-aws-cloud-development-kit#org8241d88)
    19. [Adding data to a DynamoDB table with put operation](/build-an-app-with-aws-cloud-development-kit#orgf3340e7)
    20. [Delete an item from a DynamoDB table with delete operation](/build-an-app-with-aws-cloud-development-kit#orgda40fb2)
    21. [Add external dependencies to an AWS Lambda function deployed with CDK](/build-an-app-with-aws-cloud-development-kit#org2402563)
    22. [Connect React app to a serverless backend deployed with CDK and fix CORS issues](/build-an-app-with-aws-cloud-development-kit#org06cade2)
    23. [Add a custom CloudFormation stack output with CDK](/build-an-app-with-aws-cloud-development-kit#org00eb521)
    24. [Deploy a static website to S3 with AWS CDK](/build-an-app-with-aws-cloud-development-kit#orgf442f2b)
    25. [Deploy a site with HTTPS support behind a CDN with CDK](/build-an-app-with-aws-cloud-development-kit#orgd4e3faf)
    26. [Destroy an AWS CDK stack](/build-an-app-with-aws-cloud-development-kit#orgeb2cfae)

- **tags:** [[AWS Cloud Development Kit]], [[Tomasz Lakomy]], [[egghead]]

<a id="org538806f"></a>

## Podcast

Typescript is not required.

Learning a lot of tools from AWS. Not just Cloud Development Kit.

Implement a bunch of buckets is minimal lines of code.

By default, amazon does not allow lambdas or users to do anything.

API gateway allows you to call lambdas from the internet.

We are going to learn how to deal with CORS.

Building a todo app. If you dont know AWS, you will be learning a lot.

Using DynamoDB.

You can destroy your AWS set up very easily.

Experiment with the things you learn. Add editing a todo.

<a id="org2fc32fe"></a>

## Lessons

<a id="orgc200104"></a>

### Install AWS Cloud Development Kit (CDK) and create a new project

I like to have my globals installed with brew:
`brew install aws-cdk`

cdk &#x2013;version

cdk init

supported by multiple languages.

We will be using typescript.

npm run build to build our app.

cdk init cannot be ran in a non empty directory

<a id="org1aa0639"></a>

### Build and deploy a sample AWS Cloud Development Kit stack to AWS

bin/todo-app.ts is the entry point to our app stack.

Definition of our infrastructure with code.

Constructs are the basic building blocks. Represents a single resource.

cdk deploy
Unable to resolve AWS account to use. It must be either configured when you define your CDK or through the environment

`brew install awscli`

<a id="org105438e"></a>

### Review an AWS CloudFormation stack deployed with AWS CDK

Our code is going to turn into a template file.

[How our app todo app is connected together.](https://share.getcloudapp.com/NQugv7br)

You have to click on CloudFormation in the aws console to get to our app.

<a id="orgdb433dd"></a>

### Clear an initial AWS CDK stack to start building an app from scratch

`cdk diff` to diff changes in your applications.
cdk wont deploy anything that you haven&rsquo;t specified.

<a id="org2d55ea5"></a>

### Create and deploy a lambda function with AWS CDK

`yarn add @aws-cdk/aws-lambda @typs/aws-lambda`

create a `lambda/hello.ts` file.

Cannot use import statement outside a module
Subprocess exited with error 1

I was editing the .js file which causes this error.

> ❌ SampleAppStack failed: Error: This stack uses assets, so the toolkit stack must be deployed to the environment (Run &ldquo;cdk bootstrap aws://unknown-account/unknown-region&rdquo;)
> at Object.addMetadataAssetsToManifest (/usr/local/Cellar/aws-cdk/1.45.0/libexec/lib/node<sub>modules</sub>/aws-cdk/lib/assets.ts:28:11)
> at Object.deployStack (/usr/local/Cellar/aws-cdk/1.45.0/libexec/lib/node<sub>modules</sub>/aws-cdk/lib/api/deploy-stack.ts:205:29)
> at processTicksAndRejections (internal/process/task<sub>queues.js</sub>:97:5)
> at CdkToolkit.deploy (/usr/local/Cellar/aws-cdk/1.45.0/libexec/lib/node<sub>modules</sub>/aws-cdk/lib/cdk-toolkit.ts:181:24)
> at main (/usr/local/Cellar/aws-cdk/1.45.0/libexec/lib/node<sub>modules</sub>/aws-cdk/bin/cdk.ts:250:16)
> at initCommandLine (/usr/local/Cellar/aws-cdk/1.45.0/libexec/lib/node<sub>modules</sub>/aws-cdk/bin/cdk.ts:183:9)
> This stack uses assets, so the toolkit stack must be deployed to the environment (Run &ldquo;cdk bootstrap aws://unknown-account/unknown-region&rdquo;)

`cdk bootstrap` [github issue link](https://github.com/aws/aws-cdk/issues/3091#issuecomment-514219068)

<a id="orgc1cb745"></a>

### Review and execute a lambda function deployed with CDK in AWS Console

You can see in the resources:

- CDKMetadata
- HelloLambda
- HelloLambdaServiceRole

  You can click the Physical ID of HelloLambda to visit the lambdas console.

  We configure a test event with the Amazon API Gateway AWS Proxy template

<a id="org67a178d"></a>

### Change the properties of a lambda function deployed with AWS CDK

You can configure your lambda with the object passed into the `lambda.Function`

     const helloLambda = new lambda.Function(this, "HelloLambda", {
      // where our code is located (inside the lambda directory)
        code: lambda.Code.asset("lambda"),
        // the function executed whenever this lambda function is triggered (the handler function inside hello.ts file)
        handler: "hello.handler",
        // most recent node
        runtime: lambda.Runtime.NODEJS_12_X,
          memorySize: 256,
          timeout: cdk.Duration.seconds(10)
    });

<a id="orgb06fd19"></a>

### Attach an API Gateway to a lambda function deployed with AWS CDK

We need to add triggers to this lambda to actually triger a lambda on the web.

add the @aws-cdk/api-gateway package to our app. Then we need to configure the gateway passing our helloLambda function to it:

    new apiGateway.LambdaRestApi(this, 'Endpoint', {
          handler: helloLambda
        })

Heres my endpoint: <https://81eq25iin1.execute-api.us-east-1.amazonaws.com/prod/>

<a id="org4caa786"></a>

### Pass environment variables to a lambda function deployed with AWS CDK

Pass `environment` object to you lambda to provide `process.env` variables in your lambda.

    const helloLambda = new lambda.Function(this, "HelloLambda", {
      // where our code is located (inside the lambda directory)
        code: lambda.Code.asset("lambda"),
        // the function executed whenever this lambda function is triggered (the handler function inside hello.ts file)
        handler: "hello.handler",
        // most recent node
        runtime: lambda.Runtime.NODEJS_12_X,
          memorySize: 256,
          timeout: cdk.Duration.seconds(10),
          environment: {
            isProduction: 'absolutely note'
          }
    });

<a id="org8f3bca0"></a>

### Run lambda functions built with CDK locally using AWS SAM

Run your lambda functions locally with `sam`. This requires docker.

<a id="org505b4b7"></a>

### Create and deploy an S3 bucket with AWS CDK

You can create an S3 bucket with the `@aws-cdk/aws-s3` package.

    const logoBucket = new s3.Bucket(this, "LogoBucket", {})

<a id="org2afaa05"></a>

### Make the contents of an S3 bucket deployed with CDK public

By default, the contents of the bucket are secure.

You can add `publicReadAccess: true` to make the contents readable.

<a id="org60b9d27"></a>

### Create an S3 event notification to trigger a lambda function on file upload

`yarn add @aws-cdk/aws-s3-notifications`

add the event notification when a file gets create:

    logoBucket.addEventNotification(
          // everytime a new file is added to our bucket
          s3.EventType.OBJECT_CREATED,
          // execute our lambda function
          new s3Notifications.LambdaDestination(helloLambda)
      );

<a id="orgee0fd50"></a>

### Use a bucket deployment to upload a file to S3 when deploying a CDK stack

`yarn add @aws-cdk/aws-s3-deployment`

create and `assets/` folder and put an image in it.

    new s3Deployment.BucketDeployment(this, "DeployLogo", {
            destinationBucket: logoBucket,
            // an array of sources
            sources: [s3Deployment.Source.asset("./assets")]
        });

Now you deploy your code and assets get uploaded!

<a id="orgfa3460d"></a>

### Create a custom AWS CDK construct

Constructs can represent a single resource or a high-level component that holds multiple resources.

Created `lib/todo-backend.ts` and added

    import * as cdk from "@aws-cdk/core"

    export class TodoBackend extends cdk.Construct {
        constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps){
            super(scope, id)
        }
    }

The community notes had me add `public readonly handler: lambda.Function` which was not in the lesson.

<a id="org8df9217"></a>

### Create a DynamoDB table with AWS CDK

DynamoDB: NoSQL db.

create a table:

    new dynamodb.Table(this, "TodoDatabase", {
            partitionKey: {}
        })

We need a partition key to uniquely identify an item.

Got `A class member cannot have the 'const' keyword` because I put the table declaration outside of the constructor.

Added an item in the dynamodb console.

<a id="org86c3775"></a>

### Get all items from a DynamoDB table deployed with CDK using DocumentClient API

We delete our dummy hello.ts lambda.

Create `todoHandler.ts`.

To return all of the items in the database, you use `dynamo.scan` and pass in the {TableName}~.

We will get the tableName from a process.env.TABLE<sub>NAME</sub>

In our `todo-backend` we need to create a new lambda.Function:

     this.handler = new lambda.Function(this, 'TodoHandler', {
        code: lambda.Code.fromAsset("lambda"),
        handler: 'todoHandler.handler',
        runtime: lambda.Runtime.NODEJS_12_X,
        environment: {
            TABLE_NAME: todosTable.tableName
        }
    })

Then in our `sample_app-stack` we will delete the old hello lambda code and replace it with our new `todoBackend.handler`.

    export class SampleAppStack extends cdk.Stack {
      constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const todoBackend = new TodoBackend(this, "TodoBackend")

        new apiGateway.LambdaRestApi(this, 'Endpoint', {
          handler: todoBackend.handler
        })

        const logoBucket = new s3.Bucket(this, "LogoBucket", {publicReadAccess: true})

        new s3Deployment.BucketDeployment(this, "DeployAssets", {
          destinationBucket: logoBucket,
          sources: [s3Deployment.Source.asset('./assets')]
        })
      }
    }

<a id="org8241d88"></a>

### Debug permission issues and allow a lambda function to access data from a DynamoDB table

By default, our todo handler is not authorized to scan our dynamodb database.

<https://81eq25iin1.execute-api.us-east-1.amazonaws.com/prod/>

You can debug the issue by going to the todo backend lambda function and look at the logs:

> TodoBackendTodoHandler5E0A880F-1IY9KRRBTVD9B is not authorized to perform: dynamodb:Scan on resource: arn:aws:dynamodb:us-east-1:281434613127:table/SampleAppStack-

Principle of Least Priviledge.

This fixes the issue:

    todosTable.grantReadWriteData(this.handler)

`curl https://81eq25iin1.execute-api.us-east-1.amazonaws.com/prod/`

<a id="orgf3340e7"></a>

### Adding data to a DynamoDB table with put operation

updated our event handler:

    try {
            const { httpMethod, body: requestBody } = event;
            // if GET return todos
            if (httpMethod === "GET") {
                const response = await getAllTodos();

                return createResponse(response.Items || []);
            }
            if (!requestBody) {
                return createResponse("Missing request body", 500);
            }

            // parsing the data we sent to the server
            const data = JSON.parse(requestBody);
            // if POST add a todo
            if (httpMethod === "POST") {
                const todo = await addTodoItem(data);
                return todo
                    ? createResponse(`${todo} added to the database`)
                    : createResponse("Todo is missing", 500);
            }
            // if DELETE, delete todo (we'll imlement that in the next lesson)
            if (httpMethod === "DELETE") {
                const id = await deleteTodoItem(data);
                return id
                    ? createResponse(
                          `Todo item with an id of ${id} deleted from the database`
                      )
                    : createResponse("ID is missing", 500);
            }

            return createResponse(
                `We only accept GET, POST, OPTIONS and DELETE, not ${httpMethod}`,
                500
            );
        } catch (error) {
            console.log(error);
            return createResponse(error, 500);
        }

We will use `dynamodb.put` to find and update OR create an item based off the id.

    const addTodoItem = async (data: { todo: string; id: string }) => {
        const { id, todo } = data;
        if (todo && todo !== "") {
            await dynamo
                .put({
                  // params object with two properties (TableName is our env variable)
                    TableName: tableName,
                    Item: {
                        id: "this_is_a_new_id",
                        todo
                    }
                })
                .promise();
        }
        return todo;
    };

<a id="orgda40fb2"></a>

### Delete an item from a DynamoDB table with delete operation

We can use `dynamodb.delete`.

    const deleteTodoItem = async (data: { id: string }) => {
        const { id } = data;

        if (id && id !== "") {
            await dynamo
                .delete({
                    TableName: tableName,
                    Key: {
                      // each todo needs a unique id
                        id
                    }
                })
                .promise();
        }

        return id;
    };

<a id="org2402563"></a>

### Add external dependencies to an AWS Lambda function deployed with CDK

We will use `uuid` to generate random hashes.

We need to init a package.json file in `lambda` before we add `uuid`.

Then we can `import {v4 as uuid} from 'uuid'` and add this to our put request:

    const addTodoItem = async (data: { todo: string; id: string }) => {
        const { id, todo } = data;
        if (todo && todo !== "") {
            await dynamo
                .put({
                  // params object with two properties (TableName is our env variable)
                    TableName: tableName,
                    Item: {
                        id: id || uuid(),
                        todo
                    }
                })
                .promise();
        }
        return todo;
    };

<a id="org06cade2"></a>

### Connect React app to a serverless backend deployed with CDK and fix CORS issues

We have to add some headers in our response of our lambda function handler.

    return {
         statusCode,
         headers: {
             // this API can be accessed from all origins
             "Access-Control-Allow-Origin": "*",
             // and will allow for all of these methods
             // OPTIONS is a pre-flight method and is sent before the actual method `GET`, `POST`, `DELETE`
             "Access-Control-Allow-Methods": "OPTIONS,GET,POST,DELETE"
         },
         body: JSON.stringify(body, null, 2)
     };

We have to handle the CORS preflight requests now in our lambda handler function:

    if (httpMethod === "OPTIONS") {
         return createResponse("ok");
     }

<a id="org00eb521"></a>

### Add a custom CloudFormation stack output with CDK

If you want to see the output of a Construct, in this case our S3 bucket, you can add a cdk output in your stack

      new cdk.CfnOutput(this, "LogoPath", {
      // add the name of your bucket and your file (in the assets folder)
        value: `https://${logoBucket.bucketDomainName}/testFile.png`
    });

<a id="orgf442f2b"></a>

### Deploy a static website to S3 with AWS CDK

You just need to point the build of your app to a directory that our stack is watching. We will create a new S3 bucket and add some output to get the url of our website back.

    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
          // so that it's publicly available
          publicReadAccess: true,
          // the index document
          websiteIndexDocument: "index.html"
        });

        new s3Deployment.BucketDeployment(this, "DeployWebsite", {
          destinationBucket: websiteBucket,
          // path to our build directory
          sources: [s3Deployment.Source.asset("../frontend/build")]
        });

        new cdk.CfnOutput(this, "WebsiteUrl", {
          value: websiteBucket.bucketWebsiteUrl
        });

<a id="orgd4e3faf"></a>

### Deploy a site with HTTPS support behind a CDN with CDK

There is a user created construct for SPAs that puts our app behind cloudfront and adds ssl.

`yarn add cdk-spa-deploy`

    new SPADeploy(this, "WebsiteDeployment").createSiteWithCloudfront({
        indexDoc: "index.html",
        websiteFolder: "../frontend/build"
    });

<a id="orgeb2cfae"></a>

### Destroy an AWS CDK stack

`cdk destroy` will delete your whole stack.

S3 buckets are skipped.

You can run `cdk deploy` to deploy everything again.
