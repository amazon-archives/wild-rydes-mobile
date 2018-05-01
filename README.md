# Wild Rydes React Native

Welcome to the Wild Rydes React Native project. In this project, we will take you through the steps necessary to build a complete react native application with analytics, authentication, email list sign-up and booking of a ride.

# Getting Started

To get started, we'll need to create a new AWS Mobile project.

1. Install the AWS Mobile CLI:    

```bash
npm i -g awsmobile-cli
```

2. Configure with your IAM credentials    

```bash
awsmobile configure
```

3. Create a new project   

```bash
awsmobile init
```

## Lesson 1: Authentication  

Let's add user sign-in to the app. 

First, we need to set up a new Mobile Hub project. This can be either through the AWS Console or with the command line.

### Creating a new Mobile Hub project via the command line

1. Install the CLI if it is not already installed

```bash
npm i -g awsmobile-cli
```

2. Configure the CLI with your credentials

```bash
awsmobile configure
```

3. Create a new Mobile Hub project

```bash
awsmobile init
```
_Here you can accept defaults for all options, or specify your project name_  
<br />

4. Now, we need to add User SignIn capabilities. We can do this with the `awsmobile <featurename> enable` command. This will automatically create a new Cognito configuration for us.

```bash
awsmobile user-signin enable
awsmobile push
```

5. Now we need to configure app to use Amplify as well as our newly created configuration.

```js
// index.js
import Amplify from 'aws-amplify'
import config from './src/aws-exports'

Amplify.configure(config)
```

### Adding Authentication to the app

Now let's update both Apply.js & SignIn.js to interact with the Amazon Cognito configuration that we now have using the Auth component from `aws-amplify`.

Update form in __Apply.js__ to use `signUp` & `confirmSignUp` methods:

```js
// Apply.js
// import Auth module
import { Auth } from 'aws-amplify'

// update signUp method
signUp = () => {
  const {
    email,
    username,
    phone_number,
    password
  } = this.state

  Auth.signUp({
    username,
    password,
    attributes: {
      email,
      phone_number
    }
  })
  .then(success => {
    console.log('successful sign up: ', success)
    this.setState({ showConfirmation: true })
  })
  .catch(err => console.log('error signing up: ', err))
}

// update confirmSignUp method
confirmSignUp = () => {
  const { username, confirmationCode } = this.state
  Auth.confirmSignUp(username, confirmationCode)
    .then(success => {
      console.log('successfully confirmed sign up!: ', success)
      this.props.navigation.navigate('SignIn')
    })
    .catch(err => console.log('error confirming sign up!: ', err))
}
```

Update form in __SignIn.js__ to use `signIn` & `confirmSignIn` methods:

```js
// import Auth module
import { Auth } from 'aws-amplify'

// update signIn method
signIn = () => {
  const { username, password } = this.state
  Auth.signIn(username, password)
    .then(user => {
      console.log('successful sign in!: ', user)
      this.setState({ showConfirmation: true, user })
    })
    .catch(err => {
      console.log('error signing in...: ', err)
    })
}

// update confirmSignIn method
confirmsignIn = () => {
  const { user, confirmationCode } = this.state
  Auth.confirmSignIn(user, confirmationCode)
    .then(success => {
      console.log('success confirming sign in!: ', success)
      this.props.navigation.navigate('HomeNav')
    })
    .catch(err => {
      console.log('error confirming sign in...: ', err)
      this.setState({ showConfirmation: false })
    })
}
```

## Lesson 2: Analytics

Now we want to begin recording events informing us about what the user is doing in the app, and how they are interacting with our app.

We can do this with the `Analytics` module from AWS Amplify.

`Analytics` can take either one, two or three arguments:

```js
// passing in an event name
Analytics.record('Button Click!')

// passing in an event name as well as an attribute
Analytics.record('Button Click', { eventType: 'ride requested' })

// passing in an event name, attribute, and metrics
Analytics.record('Button Click', { eventType: 'ride requested' }, { unicorn: 'Bucephalus' })
```

### Recording an event

Let's add a button that records the number of user's that click on the __GIDDY UP__ button to sign up for the app.

In `Home.js`, let's add a new method and attach the method to the button press event:

```js
// Home.js

// import Analytics module
import { Analytics } from 'aws-amplify'

// record event
signUp = () => {
  Analytics.record('Apply button clicked')
  this.props.navigation.navigate('Apply')
}
```

We'll record some more meaningful analytics once we add our ride request functionality.

## Lesson 3: Create a Serverless Backend

First, create a DynamoDB table.  This can only be done on the console (creating a database on the command line also creates a CRUD API which is not desired in this instance):

* Open the [AWS Mobile Hub Console](https://console.aws.amazon.com/mobilehub/home).
* Choose your project.
* Under **Add more backend features**, choose **NoSQL Database**.
* Choose **Enable NoSQL**, then choose **Add Table**.
* Choose **Custom**.  Fill in the presented form:
  * Table name: **Rides**
  * Permissions: **Public**
  * Attributes:
    * RideId / String / Partition Key
* Choose **Create table**.
* Confirm the table creation by choosing **Create table** again.

Next, create the Cloud Logic API.  This can be done from the command line:

```
awsmobile pull
awsmobile cloud-api enable --prompt
```

The `awsmobile pull` command will pull the current definition from the AWS Mobile Hub service.  This will include the definition of the DynamoDB table.  You can then continue by changing the current definition with the second `awsmobile` command.

Select **Create a new API**.  This will prompt you for some information:

* API Name: **requestUnicorn**
* Restrict API Access to signed-in users? **Y**
* HTTP Path Name: **/ride**
* Lambda Function Name: **requestUnicorn**
* Add another HTTP path name? **N**

Once complete, copy `./server/requestUnicorn.js` to `./awsmobilejs/backend/cloud-api/requestUnicorn/app.js`.  This is the code that will be run in the serverless backend in response to the API request.

Run `awsmobile push` to publish the backend changes to AWS.

Finally, edit the `./src/pages/MainApp.js` page.  Adjust the getData() method to read as follows:

```
  async getData(pin) {
    const body = {
      PickupLocation: {
        Longitude: pin.longitude,
        Latitude: pin.latitude
      }
    };
    return await API.post(apiName, apiPath, { body });
  }
```

Publish the application using `awsmobile publish`.  Run the application (either locally or from the cloud), log in.  Click somewhere on the map to set the pickup location, then click Request to request the ride.

