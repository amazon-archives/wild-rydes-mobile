# AWS Mobile Loft - Introduction to AWS Mobile

## Getting started

To get started, we will first create a new React application using the Create React App CLI.

> If you do not already have Creeate React App installed, installed:

```
npm install -g create-react-app
```

#### Creating the app

```
create-react-app react-aws-app
```

## Lesson 1 - Introduction to AWS Mobile Hub & the AWS Mobile CLI

Installing & configuring a new mobile hub project.

#### ⚡ Installing the AWS Mobile CLI

```
npm i -g awsmobile-cli
```

#### ⚡ Configuring the CLI

```
awsmobile configure
```

To get an __accessKeyId__ & __secretAccessKey__:
1. Visit the [IAM Console](https://console.aws.amazon.com/iam/home).
2. Click __Users__ in left hand menu.
3. Click __Add User__.
4. Give the user a name & choose __programatic access__ as the access type & click next.
5. Click __Create Group__.
6. Give the group a name & choose __Administrator Access__ as the access type & click __Create Group__.
7. Click __Next__ & click __Create User__.
8. Copy the __accessKeyId__ & __secretAccessKey__ to the terminal to configure the CLI.

#### ⚡ Creating a new Project

```
awsmobile init
```

After running the above command you will have a few options:

- Choose default for source directory
- Choose default for distribution directory
- Choose default for build command
- __Give the project a name of AmplifyReact__
- Choose default for project's start command

## Lesson 2 - Integrating AWS & AWS Amplify into your React application

#### ⚡ Configuring the project with `Amplify` & `aws-exports.js`

1. Open index.js
2. Add the following code below the last `import` statement

```js
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)
```

#### ⚡ Adding a new service - User Signin with Amazon Cognito

1. Add the new functionality using the CLI

```bash
awsmobile user-signin enable
```

2. Push the new configuration to the Mobile Hub Console

```bash
awsmobile push
```

3. To view the console, run the following command:

```bash
awsmobile console
```

#### ⚡ Implementing User-signup & User-signin using the `withAuthenticator` HOC

1. Open App.js

2. Import the `withAuthenticator` HOC from 'aws-amplify-react'

```js
import { withAuthenticator } from 'aws-amplify-react'
```

3. Wrap the App export with the `withAuthenticator` HOC

```js
export default withAuthenticator(App)
```

#### ⚡ Introduction to implementing hand-rolled Authentication 

AWS Amplify Auth category has over 30 different methods available, including `signUp`, `confirmSignUp`, `signIn`, `confirmSignIn`, `changePassword`, `forgotPassword` & many many others. You can view the entire API [here](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html).

To manually sign up a new User with our existing Amazon Cognito configuration, we can call `Auth.signUp`, & must provide the following parameters:

- username`<string>`
- password`<string>`
- attributes`<object>`
  - email`<string>`
  - phone_number`<string>`

We would call some method, passing in the above info to `Auth.signUp`. In React, it could look something like this:

```js
import { Auth } from 'aws-amplify'

signUpUser = () => {
  const { username, password, email, phone_number } = this.state
  Auth.signUp({
    username, password, attributes: { email, phone_number }
  })
  .then(success => console.log('successfully signed up user!: ', success))
  .catch(err => console.log('error signing up user: ', err))
}
```

This would trigger an __MFA__ using the provided phone number.

To handle __MFA__ on user sign up & sign in, we can use `confirmSignUp` & `confirmSignIn`.

To see how to build a custom UI using the Auth class, check out [this](https://aws-amplify.github.io/amplify-js/media/authentication_guide#sign-in) section of the documentation.