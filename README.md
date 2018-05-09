# Wild Rydes Mobile

Welcome to the Wild Rydes Mobile project.  In this project, we will take you through the steps necessary to build a complete website with analytics, authentication, email list sign-up and booking of a ride.

## Getting Started

To continue with this course, you must first have the AWS Mobile CLI installed and configured:   

1. Install the CLI   

```
npm i -g awsmobile-cli
```

2. Configure the CLI   

```
awsmobile configure
```


## Lesson 1: Web Hosting

The design team has dropped the final version of the web site, but has not set up web hosting.  In this lesson, we will quickly set up a scalable web site with global reach and deploy the code to the web site.

Clone the project & change into the directory:

```
git clone https://github.com/aws-samples/wild-rydes-mobile
cd wild-rydes-mobile
```

Install the dependencies using npm or yarn:

```
yarn
or
npm install
```

__Create the new Mobile Hub project__

```
awsmobile init
```

For the questions:

* Where is your project's source directory: (src) **src**
* Where is your project's distribution directory that stores build artifacts (build) **build**
* What is your project's build command: (npm run-script build) **yarn run build**
* What is your project's start command for local test run: (npm run-script start) **yarn start**
* What awsmobile project name would you like to use: (wild-rydes-mobile-2018-03-09-14-57-35) **wild-rydes-mobile**

The AWS Mobile Hub project will be created.

__To run the projecte locally:__

Run the project locally using either npm or yarn: 

```
yarn start
or
npm start
```

__To build the website in the cloud:__

Use the following to build and publish the project to the cloud:

```
awsmobile publish
```

A browser will open pointing to the newly created site once publication completes.

## Lesson 2: Analytics & Email Campaign

### Part 1. Analytics   

Edit the `src/index.js` file.  Add the following lines to the top of the file (below all the other imports) to configure Amplify:

```
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';

Amplify.configure(awsConfig);
```

Record path name as user navigates:

```js
// import Analytics
import Amplify, { Analytics } from 'aws-amplify'

// src/index.js
const PrivateRoute = ({ component: Component, ...rest }) => {
  Analytics.record('route path: ', { routeName: rest.path }) 
  return (
    <Route
      {...rest}
      render={props => (
      isAuthenticated() === true
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
  )
};

```

### Part 2. 

One of the features on the home page is an email sign-up page.  In this lesson, you will link the email sign-up to Amazon Pinpoint, then use the Amazon Pinpoint user segmentation and campaigns features to send an email to all the registered users.

Edit the `src/components/EmailSignUp.js` file.  Add the following lines to the top of the file:

```
import uuid from 'uuid';
import { Auth } from 'aws-amplify';
import * as Pinpoint from 'aws-sdk/clients/pinpoint';
import awsConfig from '../aws-exports';
```

Then look for `/* TODO: HANDLE FORM INPUT */` - this is where we need to add code to submit the email address into the Amazon Pinpoint analytics platform.  Replace the onEmailSubmitted() method that is there now with the following:

```
  async onEmailSubmitted(event) {
    event.preventDefault();

    // Create a Pinpoint connection
    const credentials = await Auth.currentCredentials();
    const pinpointClient = new Pinpoint({
      region: awsConfig.aws_mobile_analytics_app_region,
      credentials: Auth.essentialCredentials(credentials)
    });
    if (!this.endpointId)
      this.endpointId = uuid.v4();

    // Create an endpoint definition
    const params = {
      ApplicationId: awsConfig.aws_mobile_analytics_app_id,
      EndpointId: this.endpointId,
      EndpointRequest: {
        Address: this.state.email,
        ChannelType: 'EMAIL',
        EffectiveDate: new Date().toISOString(),
        OptOut: 'NONE',
        RequestId: uuid.v4(),
        User: {
          UserAttributes: {
            email: [ this.state.email ],
            emailsignup: [ 'true' ]
          },
          UserId: this.state.email
        }
      }
    };

    // Update the endpoint definition
    pinpointClient.updateEndpoint(params, (err, data) => {
      if (err) {
        alert('Email Signup Failed');
        console.error('updateEndpoint: ', err);
      } else {
        this.setState({ email: '', emailsubmitted: true });
      }
    });
    /* END OF PINPOINT CHANGES */
  }
```

Change the function to "async" by adding async in the front of `onEmailSubmitted(event)`

Publish the code with `awsmobile publish`.  Once the app has been published, enter your email address within the email sign-up form and click **Submit**.

### Configure the Email Channel

* Open the AWS Mobile Hub console, and select your project.
* Choose **Analytics** (in the top-right corner).
* Choose **Settings** (in the left-hand menu).
* Choose **Channels** (along the top)
* Choose **Email** > **Enable Email Channel**
* Choose **Email Address**, enter your email address.
* If required, click Verify and complete the verification process.
* Choose **Save**.

### Create a User Segment

* Choose **Segments** (in the left-hand menu).
* Choose **New segment**.
* Give your segment a name like "Email List Users"
* Fill in the form:
	* **Build segment**.
	* **Email**.
  * Filter by user attributes: **emailsignup** > **true**.
* Validate that the segment estimate is 1 user.
* Choose **Create segment**.

### Create an Email Campaign

* Choose **Campaigns**
* Choose **New campaign**
* Name the campaign "New Email List Campaign", then choose **Next step**
* Choose **Use a previously defined segment**
* Select your segment, then choose **Next step**
* Enter a subject and body, then choose **Next step**
* Select **Immediate**, then choose **Next step**
* Choose **Launch campaign**

Check your email for your test message!

## Lesson 3: Authentication

Sign up, sign in, and forgot password screens have been provided, but need to be wired up to the main application.  First, create an Amazon
Cognito user pool:

```
awsmobile user-signin enable
awsmobile push
```

This will update the backend without publishing updated code.  Now, update the `src/auth/SignUp.js` file to do the sign-up process:

```
  async onSubmitForm(e) {
    e.preventDefault();
    try {
      const params = {
        username: this.state.email.replace(/[@.]/g, '|'),
        password: this.state.password,
        attributes: {
          email: this.state.email,
          phone_number: this.state.phone
        },
        validationData: []
      };
      const data = await Auth.signUp(params);
      console.log(data);
      this.setState({ stage: 1 });
    } catch (err) {
      alert(err.message);
      console.error("Exception from Auth.signUp: ", err);
      this.setState({ stage: 0, email: '', password: '', confirm: '' });
    }
  }

  async onSubmitVerification(e) {
    e.preventDefault();
    try {
      const data = await Auth.confirmSignUp(
        this.state.email.replace(/[@.]/g, '|'),
        this.state.code
      );
      console.log(data);
      // Go to the sign in page
      this.props.history.replace('/signin');
    } catch (err) {
      alert(err.message);
      console.error("Exception from Auth.confirmSignUp: ", err);
      this.setState({ stage: 0, email: '', password: '', confirm: '', code: '' });
    }
  }
```

Update the `src/auth/SignIn.js` file to do the sign-in process:

```
  async onSubmitForm(e) {
    e.preventDefault();
    try {
        const userObject = await Auth.signIn(
            this.state.email.replace(/[@.]/g, '|'),
            this.state.password
        );
        console.log('userObject = ', userObject);
        this.setState({ userObject, stage: 1 });
    } catch (err) {
        alert(err.message);
        console.error('Auth.signIn(): ', err);
    }
  }

  async onSubmitVerification(e) {
    e.preventDefault();
    try {
        const data = await Auth.confirmSignIn(
            this.state.userObject,
            this.state.code
        );
        console.log('data = ', data);
        this.setState({ stage: 0, email: '', password: '', code: '' });
        this.props.history.replace('/app');
    } catch (err) {
        alert(err.message);
        console.error('Auth.confirmSignIn(): ', err);
    }
  }
```

Finally, take a look at the route configuration in `src/index.js`.  We
need to update so that the current authentication is read from local
storage, then adjust the routing based on authentication.

```
const isAuthenticated = () => Amplify.Auth.user !== null;


```

Run the following to publish the new site:

```
awsmobile publish -c -n -f
```

This will ensure CloudFront is also flushed.  If in doubt, go to the S3 bucket instead.  You should now be able to click on the Giddy Up! button and get a sign-up / sign-in button.  When signed-in, you should see the temporary Ride page.

## Lesson 4: Create a Serverless Backend

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

__When asked `sync corresponding contents in backend/ with #current-backend-info`? choose `y`__   

The `awsmobile pull` command will pull the current definition from the AWS Mobile Hub service.  This will include the definition of the DynamoDB table.  You can then continue by changing the current definition with the second `awsmobile` command.

Select **Create a new API**.  This will prompt you for some information:

* API Name: **requestUnicorn**
* Restrict API Access to signed-in users? **Y**
* HTTP Path Name: **/ride**
* Lambda Function Name: **requestUnicorn**
* Add another HTTP path name? **N**

Once complete, copy `./server/requestUnicorn.js` to `./awsmobilejs/backend/cloud-api/requestUnicorn/app.js`.  This is the code that will be run in the serverless backend in response to the API request.

Run `awsmobile push` to publish the backend changes to AWS.

Next, edit the hasApi method and uncomment the code:

```
hasApi() {
  const api = awsConfig.aws_cloud_logic_custom.filter(v => v.name === 'requestUnicorn');
  return (typeof api !== 'undefined');
}
```

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

