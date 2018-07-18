# AWS Mobile Loft - Introduction to AWS Mobile

## 🤖 Getting started

To get started, we will first create a new React application using the Create React App CLI.

> If you do not already have Creeate React App installed, install it now with the following command:

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

If you need to get an __accessKeyId__ & __secretAccessKey__:
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
- Choose default for build command
- Choose default for project's start command
- Give the project a name of __AmplifyReact__


Now that the project is successfully created, we need to install the proper version of the AWS Amplify React package:

```bash
npm install aws-amplify-react@0.1.54 aws-amplify@0.4.8
// or
yarn add aws-amplify-react@0.1.54 aws-amplify@0.4.8
```

Now, we can view it in the AWS Console by running the following command:

```bash
awsmobile console
```

## 🤖 Lesson 2 - Integrating AWS & AWS Amplify into your React application

In this section, we'll first integrate our AWS Mobile Hub project in with our newly created React application using the [AWS Amplify](https://aws-amplify.github.io/amplify-js/media/developer_guide) library.    

We'll also learn how to add a new service, [Amazon Cognito](https://aws.amazon.com/cognito/), to our existing AWS Mobile Hub project using the CLI. Finally, we'll implement Authentication into the application using Amazon Cognito with AWS Amplify.

#### ⚡ Configuring the project with `Amplify` & `aws-exports.js`

1. Open __index.js__
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

Now, in the list of __Backend__ services, we see that __User Signin__ is now enabled.

#### ⚡ Implementing User-signup & User-signin using the `withAuthenticator` HOC

1. Open App.js

2. Import the `withAuthenticator` HOC from `aws-amplify-react`

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

#### ⚡ Updating the Lambda function

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

#### ⚡ Rendering the list of pets from the API in the UI

Next, we want to render the data being returned from the API. To do so, we'll create some state in the component to hold the data. Then, once the data is returned from the API, we'll reset the state, passing in the new data.

1. Create state in the component

```js
state = {
  pets: []
}
```

2. Change `componentDidMount` to set the state when the data is returned.

```js
async componentDidMount() {
  const data = await API.get(apiName, path)
  console.log('data: ', data)
  this.setState({
    pets: data.data
  })
}
```

3. Finally, add the following code to your render method to display the list of pets in the UI:

```js
{
  this.state.pets.map((pet, index) => (
    <h2 key={index}>{pet}</h2>
  ))
}
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
Analytics.record({ name: 'Added socks to shopping cart', attributes: { username: 'amanda33' }, metrics: { time: '8:33pm ET' } })
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

#### ⚡ Creating the API

We can create the new API from the command line:

```bash
awsmobile appsync enable -p
```

Next, choose __API_KEY__ as the __auth type__.

Now, push the new configuration to AWS Mobile Hub:

```bash
awsmobile push
```

Now that the API has been created, let's go into the AWS console to update the configuration.

Visit the AWS AppSync console at [https://console.aws.amazon.com/appsync/](https://console.aws.amazon.com/appsync/).

Fromt here, click on the __AmplifyReact__ API to open it in the console.

#### ⚡ Configuring the API

Now we need to update the existing schema to our new schema.

Click on __Schema__ in the left hand menu to open the schema editor.

Here, delete the existing schema and add the following, then click __Save Schema__:

```js
type Pet {
  id: ID!
  name: String!
}

type Query {
  fetchPet(id: ID!): Pet
}
```

Next, click on the __Create Resources__ button in the top right corner.

When asked to __Define or select a type__, choose __Use existing type__, and then choose the Pet type. Then scroll down & click __Create__.

Once the resources have finished being created, we can start executing mutations against the API.

In the left hand menu, click on __Queries__, & add the following mutation into the query editor, then click the orange play button:

```graphql
mutation create {
  createPet(input:{
    name: "Spike"
  }) {
    id
  }
}
```

> Feel free to create as many Pets as you would like, as we will be querying for this data in just a moment.

If you would like to query the data to make sure everything is working properly, try using this query in the query editor:

```graphql
query list {
  listPets {
    items {
      id
      name
    }
  }
}
```

#### ⚡ Connecting the React application to the AWS AppSync API

Now that the API is created & working properly, let's go ahead and query for data from the client & show it in the UI.

In App.js, let's go ahead and import __API__ & __graphqlOperation__ from 'aws-amplify':

```js
// App.js
import { API, graphqlOperation } from 'aws-amplify'
```

Next, we'll define our query:

```js
const ListPets = `
  query {
    listPets {
      items {
        id
        name
      }
    }
  }
`
```

Now, in the class, we'll define some state, and set a pets property equal to an empty array for now:

```js
state = { pets: [] }
```

Now that we have some initial state, we'll call the AppSync API to fetch the data within the `componentDidMount` lifecycle hook:

```js
async componentDidMount() {
  const pets = await API.graphql(graphqlOperation(ListPets))
  console.log('pets: ', pets) // optional, if you would like to view the shape of the data
  this.setState({ pets: pets.data.listPets.items })
}
```

In the render method, we can now display the data to the UI:

```js
{
  this.state.pets.map((pet, index) => (
    <h2 key={index}>{pet.name}</h2>
  ))
}
```

The final component code for accessing the AWS AppSync API should look like this:

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { API, graphqlOperation } from 'aws-amplify'

const ListPets = `
  query {
    listPets {
      items {
        id
        name
      }
    }
  }
`

class App extends Component {
  state = { pets: [] }
  async componentDidMount() {
    const pets = await API.graphql(graphqlOperation(ListPets))
    console.log('pets: ', pets)
    this.setState({ pets: pets.data.listPets.items })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
          this.state.pets.map((pet, index) => (
            <h2 key={index}>{pet.name}</h2>
          ))
        }
      </div>
    );
  }
}

export default App;
```
