# Make predictions through AWS with SCAR

This application allows you to load an image to obtain the prediction of it through a machine learning model available from Amazon Web Services.

The application has authentication enabled through a Cognito user group or through INDIGO IAM.

## Requirements

* An existing [Cognito User Pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html) to store the  users, created in your AWS account. 

* An [Identity Pool](https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html) to have access to AWS Services, such as AWS S3 or AWS Lambda. This Identity Pool needs as an [OpenID Connect authentication provider](https://docs.aws.amazon.com/cognito/latest/developerguide/open-id.html)

* [npm](https://www.npmjs.com/) installed.

## Deployment

This is a static web application (HTML + CSS + JavaScript) and, therefore, it is expected to be deployed in an S3 bucket as this is the most secure, scalable and cost-effective approach.

1. Create a file named `src/env.js` (see example in `src/env_example.js`) specifying the corresponding values (obtained from the Cognito User Pool and Federate Identities).

1. Start a local server to verify the web application:
    ```sh
    npm run serve
    ```
    The web application will be available in `http://localhost:8080`

1. Create the static web site by issuing: 
    ```sh
    npm install
    npm run build
    ```
    The static web site will be available in the `dist` folder.

5. Upload the folder to an [S3 bucket with website configuration](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html).


## Contributing

Before you contributing to this project, you should be familiar with [What is Amazon Cognito](http://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html) and [Vue.js](https://vuejs.org/)
