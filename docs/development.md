---
title: Development
nav_order: 3
---

# Backend

The backend was created with the Amplify Framework via Cloudformation templates. We used the Amplify Command Line Interface (CLI) to create bulk of the AWS cloud services to make redeployment seamless. Services not configured with Amplify must be configured manually using the instructions provided below.

Ecrime utilizes the following AWS services:

- Hosting - Amplify Console
- Auth - Cognito
- Storage - S3, Dynamo
- API - App Sync, API Gateway\*\*
- Functions - Lambda\*\*
- SearchIndex - CloudSearch\*\*

\*\* Requires manuel configuration

![Ecrime Architecture Diagram](./ecrime-architecture-diagram.png?raw=true)

# Frontend

![](https://www.import.io/wp-content/uploads/2017/10/React-logo-1.png)

# Setup Guide

## Step 1: Install and Configure Amplify CLI

Amplify Command Line Interface (CLI) is a unified toolchain to create AWS cloud services for your app.

[Amplify CLI Installation Guide](https://docs.amplify.aws/cli/start/install)

## Step 2: Initialize Ecrime

Ecrime is an open source project. The code is available on Github: [ecrime](https://github.com/tlarson07/ecrime) under the GNU GENERAL PUBLIC LICENSE.

```
git clone https://github.com/tlarson07/ecrime.git
```

Navigate to the project root and initialize AWS Amplify in the directory. This will generate some boilerplate locally.

```
amplify init
```

- enter environment: _prod_
- select your default editor: (Visual Studio Code)
- type _'y'_ to use the AWS profile you created in Step 2
- type _'n'_ to avoid configuring Lambda Triggers for Cognito

Now we'll create the backend resources in the AWS console. This will create real AWS services that you can access from the [AWS Console](https://console.aws.amazon.com)

```
amplify push
```

## Step 3: Configure CloudSearch Domain

- navigate to [Amazon CloudSearch Console](https://console.aws.amazon.com/cloudsearch/home)
- click **Create a new search domain**
- type _'ecrime-warrants'_ for the Search Domain Name and click Continue

### 3.1 Define indexes

Indexes are the metadata that enables powerful search.

- select **Analyze sample file(s) from my local machine**
- use the config file located in the ecrime repo at `docs/cloudsearch-configuration-file.json` and click Continue

### 3.2 Create a Role

The role we will be creating enables API Gateway to push to CloudWatch Logs.

- open a new tab and navigate to [Amazon IAM Console - Roles](https://console.aws.amazon.com/iam/home#/roles)
- click **Create Role**
- select **API Gateway** and then click **Next: Permissions**
- (optional) add tags and then click **Next: Review**
- type _'ecrime-api-gateway'_ as the Role name and then click **Create Role**

### 3.3 Add Policy to CloudSearch

- return to CloudSearch tab
- update the value for the `AWS` key in the policy below
- paste it in the dialogue box

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "AWS": "ROLE-ARN-FROM-STEP-4.3"
      },
      "Action": [
        "cloudsearch:search",
        "cloudsearch:suggest"
      ]
    }
  ]
}
```

## Step 4: Configure API Gateway

- navigate to [Amazon API Gateway Console](https://console.aws.amazon.com/apigateway/home)
- click **api776dd70e**

### 4.1 Enable CORS

- select the root path of the api
- click **Actions** to open a dropdown menu
- click the **Enable CORS** dropdown item
- click the **Enable CORS** button

### 4.2 Add Authorizer

- click **Authorizers** from the sidebar and click **Create New Authorizer**
- match the fields in sample authorizer below
  ![Authorizer](./authorizer.png?raw=true)
- click **Resources** from the sidebar
- select _'ANY'_ resource under the 'warrant' route

  ![API Gateway Sidebar](./api-gateway-sidebar.png?raw=true)

- click **Method Request**
- click the dropdown next to **Authorization** and select **EcrimeAuthorizer**
- click the checkmark to save!

### 4.3 Redeploy API

- click **Actions** to open a dropdown menu
- click **Deploy API**
- select the Deployment stage and then click **Deploy**

## Step 5: Configure Lambdas

### 5.1 ConvertDocxToText Lambda

Converts Word Documents (.docx) uploaded to S3 into raw text and writes that data to UnapprovedWarrants table in Dynamo.

#### Add an environmental variable

[How to set environment variables in the Lambda console](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html)

- type _'UNAPPROVEDWARRANT_ABLE_NAME'_ for the key
- retrieve the UnapprovedWarrant Table ARN from [Amazon Dynamo Console](https://console.aws.amazon.com/dynamodb/home#tables:) paste it for the value

#### Attach policy to Lambda Function

- navigate to [Amazon Lambda Console](https://console.aws.amazon.com/lambda/home#/functions) and click the **convertDocToText** function
- open the **Permissions** tab
- under Execution role click the **Role name** (e.g. ecrimeLambdaRole123456789-dev)
- click **Attach Policy**
- click **Create Policy** and then open the **JSON** tab.
- update the value for `Resource` key in the policy below
- paste it in the dialogue box

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "dynamodb:UpdateGlobalTableSettings",
                "dynamodb:UpdateTimeToLive",
                "dynamodb:UpdateContributorInsights",
                "dynamodb:UpdateItem",
                "dynamodb:UpdateGlobalTable",
                "dynamodb:UpdateTableReplicaAutoScaling",
                "dynamodb:UpdateTable",
                "dynamodb:UpdateContinuousBackups"
            ],
            "Resource": "YOUR-UNAPPROVED-WARRANT-TABLE-ARN"
        }
    ]
}
```

- name your policy and click **Create policy**
- the new policy should be setup, return the previous tab where you were attaching a policy
- click the **refresh icon** and search your policy
- click the checkbox next to the policy to select it and click **Attach policy**

### 5.2 SyncDynamoCloudSearch Lambda

Makes warrants searchable by copying warrant metadata from ApprovedWarrants Table in Dynamo to the CloudSearch index.

#### Add an environmental variable

- type _'DOCUMENT_ENDPOINT'_ for the key
- retrieve the **document** endpoint from [Amazon CloudSearch Console](https://console.aws.amazon.com/cloudsearch/home)
- add `https://` to the beginning of the search endpoint
- paste it for the value

#### Add Dynamo Trigger

- click **Add trigger**
- from the DynamoDB table dropdown select the _'ApprovedWarrant-...-...'_
- click **Add**

### 5.3 SearchWarrants Lambda

Performs a query using the CloudSearch service.

#### Add an environmental variable

- type _'SEARCH_ENDPOINT'_ for the key
- retrieve the **search** endpoint from [Amazon CloudSearch Console](https://console.aws.amazon.com/cloudsearch/home)
- add `https://` to the beginning of the search endpoint
- paste it for the value

## Step 6: Deploy

After publishing, your terminal will display your app URL hosted on a amplifyapp.com domain. Whenever you have additional changes to publish, just re-run the `amplify publish` command.

```
amplify publish
```

🎉 Congratulations, your site is live!
