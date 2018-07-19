# Wild Rydes React Native

Welcome to the Wild Rydes React Native project. In this project, we will take you through the steps necessary to build a complete react native application with analytics, authentication and booking of a ride.

# Getting Started

To get started, we'll need to clone the repo and install the dependencies.

1. Download the repo

2. Change into the new directory   

```bash
cd wild-rydes-mobile
```

3. Install the dependencies   

```
npm install
// or
yarn
```

4. Run the project   

```bash
react-native run-ios
// or
react-native run-android
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
_Here should set __src__ as the project's source directory & accept defaults for all other options, or specify your project name if you would like to_
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

Update form in __src/auth/Apply.js__ to use `signUp` & `confirmSignUp` methods:

```js
// src/auth/Apply.js
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

Update form in __src/auth/SignIn.js__ to use `signIn` & `confirmSignIn` methods:

```js
// src/auth/SignIn.js.js
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

### Automatically sign in user on app refresh

Once the user is logged in, we want to be able to check AsyncStorage to see if the user is still available, and if so autmoatically log them in.

To do so, we can call `Auth.currentAuthenticatedUser`, and if this call returns successfully we can log them in automratically:

```js
// src/auth/Home.js
// import Auth from amplify in imports
import { Auth } from 'aws-amplify'

// make call in componentDidMount
componentDidMount() {
  Auth.currentAuthenticatedUser()
    .then(success => this.props.navigation.navigate('HomeNav'))
    .catch(err => console.log('not signed in...', err))
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

Let's add an event that tracks when a user attempts to sign up but has an error.

In __src/auth/Apply.js__, let's add the new tracking functionality to the `signUp` method in the `.catch` statement of `Auth.signUp`:

```js
// src/auth/Apply.js

// import Analytics module
import { Analytics } from 'aws-amplify'

// track error in the signUp method
.catch(err => {
  Analytics.record('Error signing up!', { message: error.message })
  console.log('error signing up: ', err)
})
```

We'll record some more meaningful analytics once we add our ride request functionality.

## Lesson 3: Create a Serverless Backend

### Creating the backend

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

### Updating the client code

Next, we need to update the onPress method & getData method to fetch a ride from the API & update the state with the data returned from the API:

```js
// src/home/HailRide.js

// update getData method with the following code
async getData() {
  const { pin } = this.state
  const body = {
    PickupLocation: {
      Longitude: pin.longitude,
      Latitude: pin.latitude
    }
  };
  return await API.post(apiName, apiPath, { body });
}

// update onPress method with the following code
async onPress() {
  const updates = ['Requesting Unicorn...']
  try {
    this.setState({
      requestRideEnabled: false,
      updates
    });
    const data = await this.getData(this.state.pin);
    console.log('data from API: ', data);
    updates.push(`Your unicorn, ${data.Unicorn.Name} will be with you in ${data.Eta} seconds`);
    this.setState({ updates });

    // Let's fake the arrival
    setTimeout(() => {
      console.log('ride complete');
      const updateList = this.state.updates;
      updateList.push([ `${data.Unicorn.Name} has arrived` ]);
      this.setState({
        updates: updateList,
        requestRideEnabled: true,
      });
    }, data.Eta * 1000);
  } catch (err) {
    console.error(err);
    updates.push([ 'Error finding unicorn' ]);
    this.setState({ updates });
  }
}
```

Publish the application using `awsmobile publish`.  Run the application (either locally or from the cloud), log in.  Click somewhere on the map to set the pickup location, then click Request to request the ride.

### Tracking a metric

Now, let's try to track the unicorn that has picked us up to see how many times he or she is called!

In the onPress method, let's add the following line:

```
Analytics.record('Unicorn requested', { unicornName: data.Unicorn.Name })
```
