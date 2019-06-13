# tanb.express

[![CircleCI](https://circleci.com/gh/tanb/tanb-express/tree/source-v8.svg?style=svg&circle-token=d0283f2a062676e8f59e24b8e99a107da1fe62c0)](https://circleci.com/gh/tanb/tanb-express/tree/source-v8)

Automated deployment using CircleCI.

All photos and pictures are copyrighted material. Code released under the MIT license. [See LICENSE file](LICENSE.md).


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-c production` option for a production build.

## SEO

![dynamic-rendering](https://github.com/tanb/tanb-express/raw/release/src/assets/img/dynamic-rendering.png)

This website use [Dynamic rendering](https://developers.google.com/search/docs/guides/dynamic-rendering) with Lambda@Edge.

### Requirements

- AWS CLI [Install AWS CLI](https://docs.aws.amazon.com/streams/latest/dev/kinesis-tutorial-cli-installation.html)
- serverless [serverless: setting up AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
- Lambda@Edge [Using AWS Lambda with CloudFront](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html)
