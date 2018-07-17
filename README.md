# AWS Mobile Loft - Introduction to AWS Mobile

## 🤖 Getting started

To get started, we will first create a new React application using the Create React App CLI.

> If you do not already have Creeate React App installed, installed:

```
npm install -g create-react-app
```

#### Creating the app

```
create-react-app react-aws-app
```

#### Running the app

First, change into the new directory of the app we just created.

```bash
cd react-aws-app
```

Next, run the following command to launch the app in the web browser:

```bash
npm start
```

## 🤖 Lesson 1 - Introduction to AWS Mobile Hub & the AWS Mobile CLI

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
- Choose default for project's distribution directory
- Choose default for distribution directory
- Choose default for build command
- __Give the project a name of AmplifyReact__
- Choose default for project's start command

## 🤖 Lesson 2 - Integrating AWS & AWS Amplify into your React application

In this section, we'll first integrate our AWS Mobile Hub project in with our newly create React application using the AWS Amplify library. We'll also learn how to add a new service, [Amazon Cognito](https://aws.amazon.com/cognito/), to our existing AWS Mobile Hub project using the CLI. Finally, we'll implement Authentication into the application using the newly created service.

#### ⚡ Configuring the project with `Amplify` & `aws-exports.js`

1. Open index.js
2. Add the following code below the last `import` statement

```js
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)
```

#### ⚡ Adding a new service - User Signin with Amazon Cognito

1. Add the new User Signin functionality using the CLI

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
// App.js

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

This Sign Up would trigger an __MFA__ using the provided phone number.

To handle __MFA__ on user sign up & sign in, we can use `confirmSignUp` & `confirmSignIn`.

To see how to build a custom UI using the Auth class, check out [this](https://aws-amplify.github.io/amplify-js/media/authentication_guide#sign-in) section of the documentation.

## 🤖 Lesson 3 - Adding an AWS Lambda Function

In this section, we'll see how to add a new Lambda function to our application. We'll then learn how to make changes to the Lambda function & push the new changes to our Mobile Hub console.

#### ⚡ Creating a new Lambda Function using the CLI

1. Run the following command to create a new Lambda function:

```bash
awsmobile cloud-api enable -p
```

2. Choose the following options:

- Create a new API
- API name: __PetAPI__
- HTTP path name: __/pets__
- Here, choose default Lambda function name by hitting enter on your keyboard
- Add another HTTP path: __n__

#### ⚡ Interacting with the Lambda function using AWS Amplify

1. In App.js, add the following below the last import

```js
// App.js
import { API } from 'aws-amplify'

let apiName = 'PetAPI';
let path = '/pets';
```

2. In the App component add a new `componentDidMount` lifecycle method to log out the returned data from the API.

```js
async componentDidMount() {
  const data = await API.get(apiName, path)
  console.log('data: ', data)
}
```

Now, we should be able to run the app and see some information passed back to us from the API.

To see what is going on here, open the following file: `awsmobilejs/backend/cloud-api/PetAPI/app.js`

Here, we can see that the Lamdba function is running an express server, handling various paths. If we look at the `app.get('/pets/'` path, we see that for right now it is returning `res.json(req.apiGateway.event);`

Let's update this to return an array of pets.

#### ⚡ Updating the Lambd function

1. Update the `app.get('/pets/'` path to the following:

```js
app.get('/pets', function(req, res) {
  const pets = [
    'Buster', 'Mary', 'Spike', 'Pebbles'
  ]
  res.json({
    data: pets
  });
});
```

2. Push the new code to Mobile Hub:

```bash
awsmobile push
```

3. Rerun the app

```bash
npm start
```

## 🤖 Lesson 4 - Adding Analytics with [Amazon Pinpoint](https://aws.amazon.com/pinpoint/)

Next, we'd like to add analytics to the app!

When we created the new Mobile Hub project, the initial configuration has Pinpoint enabled by default so we do not need to do anything add the service, we can just start using it.

The will be using the `Analytics` API from AWS Amplify to interact with Pinpoint & to log analytics.

Analytics can take the following arguments:

```js
// 1. only the event name
Analytics.record({ name: 'Add to cart button clicked' })

// 2. event name & some attributes
Analytics.record({ name: 'Added socks to shopping cart', attributes: { username: 'amanda33' }})

// 3. event name, attributes, & metrics
Analytics.record({ name: 'Added socks to shopping cart', attributes: { username: 'amanda33' }, metrics: { time } })
```

#### ⚡ Recording an Analytics event

Let's create a button that records an event.

In App.js, import the `Analytics` module:

```js
// App.js
import { Analytics } from 'aws-amplify'
```

Next, add the following method to the class:

```js
addToCart = () => {
  console.log('Simulating adding item to cart.')
  Analytics.record('Item added to cart!')
}
```

Now, create a button in the render method & attach the method to the onClick function of the button:

```js
<button onClick={this.addToCart}>Add To Cart</button>
```

Now, click on the button a couple of times. We should now be able to see the data from this event logged into our Pinpoint console.

#### ⚡ Viewing Analytics events & data in the Pinpoint console

Next, let's view the Pinpoint console to see the events we've logged so far.

1. Open the AWS Mobile Hub console

```bash
awsmobile console
```

2. Click __Analytics__ in the top right hand corner

3. Click on __Events__ in the left menu


## 🤖 Lesson 5 - Adding GraphQL with AWS AppSync

Next, we would like to add a AWS AppSync GraphQL API to the application.

#### ⚡ Creating & configuring the API

We can create the new API from the command line:

```bash
awsmobile appsync enable -p
```

Next, choose __API_KEY__ as the __auth type__.

Now, push the new configuration to AWS Mobile Hub:

```bash
awsmobile push
```

Now that the API has been created, let's to into the AWS console to update the configuration.

Visit the AWS AppSync console at 


#### ⚡ Connecting the React application to the AWS AppSync API

